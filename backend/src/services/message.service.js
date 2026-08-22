const Message = require("../models/message.model");

const getMessages = async(chatId, page=1, limit=20) => {
    const skip = (page - 1) * limit;

    const messages = await Message.find({chat: chatId})
        .populate("sender", "name profileImage")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

    return messages;
}

module.exports = { getMessages};
























