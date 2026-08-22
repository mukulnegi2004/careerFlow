
// ACCEPTED CONNECTIONS
const selectConnections = (state) => state.connection.connections;


// PENDING CONNECTION REQUESTS
const selectPendingRequests = (state) => state.connection.pendingRequests;


// LOADING
const selectConnectionLoading = (state) => state.connection.loading;


// ACTION LOADING, Used for send / accept / reject / remove buttons
const selectConnectionActionLoading = (state) => state.connection.actionLoading;


// ERROR
const selectConnectionError = (state) => state.connection.error;


export { selectConnections, selectPendingRequests, selectConnectionLoading, selectConnectionActionLoading, selectConnectionError};