import api from "./axios";

// Send connection request, receiverId = actual User document ID
const sendConnectionRequest = (receiverId) => api.post(`/connections/request/${receiverId}`);


// Accept connection request, requestId = Connection document ID
const acceptConnectionRequest = (requestId) => api.patch(`/connections/accept/${requestId}`);


// Reject connection request, requestId = Connection document ID
const rejectConnectionRequest = (requestId) => api.patch(`/connections/reject/${requestId}`);


// Get pending requests received by current user
const getPendingRequests = () => api.get("/connections/pending");


// Remove an accepted connection, connectionId = Connection document ID
const removeConnection = (connectionId) => api.delete(`/connections/${connectionId}`);


// Get all accepted connections of current user
const getConnections = () => api.get("/connections");


export { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, getPendingRequests, removeConnection, getConnections};