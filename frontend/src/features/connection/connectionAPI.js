import { createAsyncThunk } from "@reduxjs/toolkit";

import { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, 
    getPendingRequests, removeConnection, getConnections} from "../../services/connection.service";


// SEND CONNECTION REQUEST
const sendRequest = createAsyncThunk(
    "connection/sendRequest",
    async (receiverId, { rejectWithValue }) => {
        try {
            const response = await sendConnectionRequest(receiverId);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to send connection request"
            );
        }
    }
);



// ACCEPT CONNECTION REQUEST
const acceptRequest = createAsyncThunk(
    "connection/acceptRequest",
    async (requestId, { rejectWithValue }) => {
        try {
            const response = await acceptConnectionRequest(requestId);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to accept connection request"
            );
        }
    }
);



// REJECT CONNECTION REQUEST
const rejectRequest = createAsyncThunk(
    "connection/rejectRequest",
    async (requestId, { rejectWithValue }) => {
        try {
            const response = await rejectConnectionRequest(requestId);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to reject connection request"
            );
        }
    }
);



// GET PENDING REQUESTS
const fetchPendingRequests = createAsyncThunk(
    "connection/fetchPendingRequests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPendingRequests();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch pending requests"
            );
        }
    }
);


// REMOVE CONNECTION
const removeConnectionRequest = createAsyncThunk(
    "connection/removeConnection",
    async (connectionId, { rejectWithValue }) => {
        try {
            const response = await removeConnection(connectionId);
            return {
                ...response.data,
                connectionId
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove connection"
            );
        }
    }
);


// GET ALL CONNECTIONS
const fetchConnections = createAsyncThunk(
    "connection/fetchConnections",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getConnections();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch connections"
            );
        }
    }
);


export { sendRequest, acceptRequest, rejectRequest, fetchPendingRequests, removeConnectionRequest, fetchConnections};