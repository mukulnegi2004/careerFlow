import { createSlice } from "@reduxjs/toolkit";

import { sendRequest, acceptRequest, rejectRequest, fetchPendingRequests, removeConnectionRequest, fetchConnections} from "./connectionAPI";


const initialState = { 
    connections: [],                                                           // Accepted connections
    pendingRequests: [],                                                       // Requests received by current user
    loading: false,                                                            // General loading
    actionLoading: false,                                                     // Loading specifically for actions
    error: null
};


const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

        // SEND REQUEST
        .addCase(sendRequest.pending, (state) => {
            state.actionLoading = true;
            state.error = null;
        })
        .addCase(sendRequest.fulfilled, (state) => {
            state.actionLoading = false;
            state.error = null;
        })
        .addCase(sendRequest.rejected, (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        })


        // ACCEPT REQUEST
        .addCase(acceptRequest.pending, (state) => {
            state.actionLoading = true;
            state.error = null;
        })
        .addCase(acceptRequest.fulfilled, (state, action) => {
            state.actionLoading = false;
            state.error = null;
            const acceptedConnection = action.payload.connection;
            
            state.pendingRequests = state.pendingRequests.filter(                        // Remove request from pending requests
                request => request._id !== acceptedConnection._id
            );

            state.connections.push(acceptedConnection);                                 // Add connection to accepted connections
        })
        .addCase(acceptRequest.rejected, (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        })


        // REJECT REQUEST
        .addCase(rejectRequest.pending, (state) => {
            state.actionLoading = true;
            state.error = null;
        })
        .addCase(rejectRequest.fulfilled, (state, action) => {
            state.actionLoading = false;
            state.error = null;

            const rejectedConnection = action.payload.connection;

            state.pendingRequests = state.pendingRequests.filter(                           // Remove rejected request from pending list
                request => request._id !== rejectedConnection._id
            );
        })
        .addCase(rejectRequest.rejected, (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        })


        // FETCH PENDING REQUESTS
        .addCase(fetchPendingRequests.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPendingRequests.fulfilled, (state, action) => {
            state.loading = false;
            state.pendingRequests = action.payload.requests;
            state.error = null;
        })
        .addCase(fetchPendingRequests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // REMOVE CONNECTION
        .addCase(removeConnectionRequest.pending, (state) => {
            state.actionLoading = true;
            state.error = null;
        })
        .addCase(removeConnectionRequest.fulfilled, (state, action) => {
            state.actionLoading = false;
            state.error = null;
            const connectionId = action.payload.connectionId;
            state.connections = state.connections.filter(
                connection => connection._id !== connectionId
            );
        })
        .addCase(removeConnectionRequest.rejected, (state, action) => {
            state.actionLoading = false;
            state.error = action.payload;
        })


        // FETCH ALL CONNECTIONS
        .addCase(fetchConnections.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchConnections.fulfilled, (state, action) => {
            state.loading = false;
            state.connections = action.payload.connections;
            state.error = null;
        })
        .addCase(fetchConnections.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

});


export const { clearError } = connectionSlice.actions;

export default connectionSlice.reducer;