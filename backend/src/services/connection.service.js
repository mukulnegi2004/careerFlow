const Connection = require("../models/connection.model");
const User = require("../models/user.model");
const ExpressError = require("../utils/apiError");
const Notification = require("../models/notification.model");

const sendRequest = async (senderId, receiverId) => {
    if(senderId.toString() === receiverId.toString()){
        throw new ExpressError("cannot connect yourself", 400);
    }

    const user = await User.findById(receiverId);

    if(!user){
        throw new ExpressError("user not found", 400);
    }

    const existingConnection = await Connection.findOne({$or : 
        [{sender: senderId, receiver: receiverId}, {sender: receiverId, receiver: senderId}]       //if sender and receiver already connected
    })

    if(existingConnection){
        if(existingConnection.status === "pending"){
            throw new ExpressError("request already exist", 400);
        }else if(existingConnection.status === "accepted"){
            throw new ExpressError("Already connected", 400);
        }else{                                                          //if status is rejected than allow re-request, delete older connection
            await existingConnection.deleteOne();
        }
    }

    const connection = await Connection.create({sender: senderId, receiver: receiverId});

    await Notification.create({                                   //send notification to receiver
        receiver: receiverId,
        sender: senderId,
        type: "connection_request"
    });

    await connection.populate("sender receiver", "name headline profileImage")

    return connection;
}

const acceptRequest = async (requestId, userId) => {
    const request = await Connection.findById(requestId);                           //requestId => connectionId
    if(!request){
        throw new ExpressError("request not found", 400);
    }

    if(request.receiver.toString() !== userId){
        throw new ExpressError("Unauthorized", 403);
    }

    if (request.status !== "pending") {
        throw new ExpressError("Request is not pending", 400);
    }

    request.status = "accepted";
    await request.save();

    await Notification.create({                                          //send notification to sender
        receiver: request.sender,
        sender: request.receiver,
        type: "connection_accepted"
    });

    await request.populate("sender receiver", "name headline profileImage");

    return request;
}

const rejectRequest = async (requestId, userId) => {
    const request = await Connection.findById(requestId);                            //requestId => connectionId
    if(!request){
        throw new ExpressError("request not found", 400);
    }

    if(request.receiver.toString() !== userId){
        throw new ExpressError("Unauthorized", 403);
    }

    if (request.status !== "pending") {
        throw new ExpressError("Request is not pending", 400);
    }

    request.status = "rejected";
    await request.save();

    await request.populate("sender receiver", "name headline profileImage");

    return request;
}

const getPendingRequest = async(userId) => {
    const requests = await Connection.find({receiver: userId, status: "pending"}).populate("sender", "name headline profileImage");
    return requests;
}

const removeConnection = async (connectionId, userId) => {                                
    const connection = await Connection.findById(connectionId);

    if(!connection){
        throw new ExpressError("Connection not found", 404);
    }

    const isAllowed = connection.sender.toString() === userId || connection.receiver.toString() === userId;

    if(!isAllowed){
        throw new ExpressError("Unauthorized", 403);
    }

    if (connection.status !== "accepted") {
        throw new ExpressError("Users are not connected", 400);
    }

    await connection.deleteOne();
}

const getConnections = async(userId) => {
    const connections = await Connection.find({status: "accepted", $or: [
        {sender: userId}, {receiver: userId}]}).populate("sender receiver", "name headline profileImage");
    return connections;
}



module.exports = {sendRequest, acceptRequest, rejectRequest, removeConnection, getPendingRequest, getConnections};













































