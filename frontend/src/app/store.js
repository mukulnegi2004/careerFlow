import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";                 //authReducer includes everything from your slice—both the normal reducers and the extraReducers, came from "export default authSlice.reducer;"
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import aiReducer from "../features/ai/aiSlice";
import commentReducer from "../features/comment/commentSlice";
import feedReducer from "../features/feed/feedSlice";
import connectionReducer from "../features/connection/connectionSlice";
import notificationReducer from "../features/notification/notificationSlice";
import chatReducer from "../features/chat/chatSlice";

const store = configureStore({
    reducer: {                                                   //The reducer property tells Redux how the state should be updated
        auth: authReducer,                                        // Stores all authentication state managed by authSlice.
        user: userReducer,
        post: postReducer,
        ai: aiReducer,
        comment: commentReducer,
        feed: feedReducer,
        connection: connectionReducer,
        notification: notificationReducer,
        chat: chatReducer
    },                                            
})


export default store;