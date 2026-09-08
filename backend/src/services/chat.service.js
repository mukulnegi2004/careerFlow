const Chat = require("../models/chat.model");
const ExpressError = require("../utils/apiError");


const createOrGetChat = async (userId, receiverId) => {                        //avoid creating duplicate conversations between the same two users

    if (userId.toString() === receiverId.toString()) {
        throw new ExpressError("You cannot create a chat with yourself", 400);
    }
    
    const existingChat = await Chat.findOne({participants: {$all :[userId, receiverId]}});          //$all, checks whether an array contains all specified values

    if(existingChat){                                                   //returns the existing chat
        await existingChat.populate("participants", "name profileImage headline");

        return existingChat;
    } 

    const newChat = await Chat.create({                                 //creates a chat if it doesn't already exist
        participants: [userId, receiverId]
    });

    await newChat.populate("participants", "name profileImage headline");
    return newChat;
}

const getUserChats = async (userId) => {
    const chats = await Chat.find({ participants: userId})
        .populate({ path: "participants", select: " name profileImage headline"})
        .sort({ updatedAt: -1 });

    return chats;
};


const findChatById = async (chatId, userId) => {

    const chat = await Chat.findOne({ _id: chatId, participants: userId}).populate( "participants", "name profileImage headline");

    if(!chat){
        throw new ExpressError("Chat not found", 404);
    }

    return chat;
};

module.exports = {createOrGetChat, getUserChats, findChatById};



















