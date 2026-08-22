const chatService = require("../services/chat.service");
const messageService = require("../services/message.service");


const createChat = async(req, res) => {
    const {receiverId} = req.params;

    const chat = await chatService.createOrGetChat(req.user.userId, receiverId);

    res.status(200).json({
        success: true,
        chat
    })
}

const getMessages = async(req, res) => {
    const {chatId} = req.params;
    const {page, limit} = req.query;

    const messages = await messageService.getMessages(chatId, page, limit);

    res.status(200).json({
        success: true,
        messages
    })
}

const getUserChats = async (req, res) => {
    const chats = await chatService.getUserChats(req.user.userId);

    res.status(200).json({
        success: true,
        chats
    });
};

const getChatById= async(req, res) => {
    const { chatId } = req.params;
    const userId = req.user.userId;

    const chat = await chatService.findChatById( chatId, userId);

    res.status(200).json({
        success: true,
        chat
    });
}

module.exports = {createChat, getMessages, getUserChats, getChatById};

















