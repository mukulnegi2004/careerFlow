import { createSlice } from "@reduxjs/toolkit";

import {
    createOrGetChat,
    fetchChats,
    fetchChatById,
    fetchMessages,
} from "./chatAPI";


const initialState = {
    chats: [],
    currentChat: null,
    messages: [],

    currentPage: 1,
    hasMoreMessages: true,

    onlineUsers: [],

    loading: false,
    messagesLoading: false,

    error: null,
};


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        clearMessages: (state) => {                           // CLEAR MESSAGES
            state.messages = [];

            state.currentPage = 1;
            state.hasMoreMessages = true;
        },

        addMessage: (state, action) => {                           // REAL-TIME MESSAGE
            state.messages.push(action.payload);
        },

        setUserOnline: (state, action) => {                  // ONLINE USERS
            const userId = action.payload;

            if (!state.onlineUsers.includes(userId)) {
                state.onlineUsers.push(userId);
            }
        },

        setUserOffline: (state, action) => {
            const userId = action.payload;

            state.onlineUsers = state.onlineUsers.filter( id => id !== userId);
        },

        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

    },


    extraReducers: (builder) => {
        builder
            // CREATE / GET CHAT
            .addCase(createOrGetChat.pending, (state) => {                      
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrGetChat.fulfilled, (state, action) => {
                state.loading = false;

                const chat = action.payload;
                state.currentChat = chat;
                const exists = state.chats.some( existingChat => existingChat._id === chat._id);

                if (!exists) {
                    state.chats.unshift(chat);
                }
            })
            .addCase(createOrGetChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH ALL CHATS
            .addCase(fetchChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH SPECIFIC CHAT
            .addCase(fetchChatById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentChat = action.payload;
            })
            .addCase(fetchChatById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH MESSAGES
            .addCase(fetchMessages.pending, (state) => {               
                state.messagesLoading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messagesLoading = false;
                const { messages, page, limit} = action.payload;

                // Backend:
                // newest -> oldest
                //
                // UI:
                // oldest -> newest

                const orderedMessages = [...messages].reverse();


                if (page === 1) {
                    state.messages = orderedMessages;
                } else {
                    state.messages = [ ...orderedMessages, ...state.messages];
                }


                state.currentPage = page;
                state.hasMoreMessages = messages.length === limit;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.messagesLoading = false;
                state.error = action.payload;
            });

    },
});


export const { clearMessages, addMessage, setUserOnline, setUserOffline, setOnlineUsers,} = chatSlice.actions;


export default chatSlice.reducer;