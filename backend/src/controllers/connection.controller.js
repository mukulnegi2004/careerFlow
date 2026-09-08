const connectionService = require("../services/connection.service");

const sendRequest = async (req, res) => {
    const senderId = req.user.userId;
    const {receiverId} = req.params;

    const connection = await connectionService.sendRequest(senderId, receiverId);

    res.status(200).json({
        success: true,
        connection
    })

}

const acceptRequest = async (req, res) => {
    const {requestId} = req.params;

    const connection = await connectionService.acceptRequest(requestId, req.user.userId);
    res.status(200).json({
        success: true,
        connection
    })
}

const rejectRequest = async (req, res) => {
    const {requestId} = req.params;

    const connection = await connectionService.rejectRequest(requestId, req.user.userId);
    res.status(200).json({
        success: true,
        connection
    })
}

const getPendingRequest = async (req, res) => {
    const requests = await connectionService.getPendingRequest(req.user.userId);

    res.status(200).json({
        success: true,
        requests
    })
}

const removeConnection = async(req, res) => {
    const {connectionId} = req.params;

    await connectionService.removeConnection(connectionId, req.user.userId);

    return res.status(200).json({
        success: true,
        message: "connection removed"
    })
}


const getConnections = async(req, res) => {
    const connections = await connectionService.getConnections(req.user.userId);

    res.status(200).json({
        success: true,
        connections
    })
}


module.exports = {sendRequest, acceptRequest, rejectRequest, getPendingRequest, removeConnection, getConnections};























