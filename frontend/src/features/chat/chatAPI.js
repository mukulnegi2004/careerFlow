import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createChat,
    getChats,
    getChatById,
    getMessages,
} from "../../services/chat.service";


// =====================================================
// CREATE / GET CHAT
// =====================================================

const createOrGetChat = createAsyncThunk(
    "chat/createOrGetChat",

    async (receiverId, { rejectWithValue }) => {

        try {

            const response = await createChat(receiverId);

            return response.data.chat;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create chat"
            );
        }
    }
);


// =====================================================
// GET ALL CHATS
// =====================================================

const fetchChats = createAsyncThunk(
    "chat/fetchChats",

    async (_, { rejectWithValue }) => {

        try {

            const response = await getChats();

            return response.data.chats;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch chats"
            );
        }
    }
);


// =====================================================
// GET SPECIFIC CHAT
// =====================================================

const fetchChatById = createAsyncThunk(
    "chat/fetchChatById",

    async (chatId, { rejectWithValue }) => {

        try {

            const response = await getChatById(chatId);

            return response.data.chat;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch chat"
            );
        }
    }
);


// =====================================================
// GET MESSAGES
// =====================================================

const fetchMessages = createAsyncThunk(
    "chat/fetchMessages",

    async (
        { chatId, page = 1, limit = 20 },
        { rejectWithValue }
    ) => {

        try {

            const response = await getMessages(
                chatId,
                page,
                limit
            );

            return {
                messages: response.data.messages,
                page,
                limit,
            };

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch messages"
            );
        }
    }
);


export { createOrGetChat, fetchChats, fetchChatById, fetchMessages,};