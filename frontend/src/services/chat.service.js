import api from "./axios";


// Create chat OR return existing chat
const createChat = (receiverId) => {
    return api.post(`/chat/create/${receiverId}`);
};


// Get all chats of current user
const getChats = () => {
    return api.get("/chat");
};


// Get one specific chat
const getChatById = (chatId) => {
    return api.get(`/chat/${chatId}`);
};


// Get messages of a chat
const getMessages = (chatId, page = 1, limit = 20) => {
    return api.get(
        `/chat/messages/${chatId}?page=${page}&limit=${limit}`
    );
};


export {
    createChat,
    getChats,
    getChatById,
    getMessages,
};