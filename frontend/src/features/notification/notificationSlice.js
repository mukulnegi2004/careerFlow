import { createSlice } from "@reduxjs/toolkit";

import { fetchNotifications, markAsRead } from "./notificationAPI";


const initialState = {
    notifications: [],
    loading: false,
    error: null
};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
        },

        clearNotificationError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

            // Get Notifications
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;

                state.notifications = action.payload.notifications;
            })

            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Mark Notification As Read
            .addCase(markAsRead.pending, (state) => {
                state.error = null;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {         //find() returns the actual object from the array
                const notification = state.notifications.find((notification) => notification._id === action.payload.notificationId);

                if (notification) {
                    notification.isRead = true;
                }
            })
            .addCase(markAsRead.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});


export const { clearNotifications, clearNotificationError} = notificationSlice.actions;


export default notificationSlice.reducer;