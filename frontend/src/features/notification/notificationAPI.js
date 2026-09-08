import { createAsyncThunk } from "@reduxjs/toolkit";

import { getNotifications, markNotificationRead } from "../../services/notification.service";


// Get Notifications
const fetchNotifications = createAsyncThunk(
    "notification/fetchNotifications",
    async (_, thunkAPI) => {
        try {
            const { data } = await getNotifications();

            return {
                notifications: data.notifications
            };
        } catch (err) {
            return thunkAPI.rejectWithValue( err.response?.data?.message || "Failed to fetch notifications");
        }
    }
);


// Mark Notification As Read
const markAsRead = createAsyncThunk(
    "notification/markAsRead",
    async (notificationId, thunkAPI) => {
        try {
            await markNotificationRead(notificationId);

            return {
                notificationId
            };
        } catch (err) {
            return thunkAPI.rejectWithValue( err.response?.data?.message || "Failed to mark notification as read");
        }
    }
);


export { fetchNotifications, markAsRead};