//This file contains Redux selectors, selector is simply a function that reads a specific piece of data from the Redux store, It does not modify the store. It only returns data.

const selectUser = (state) => state.auth.user;

const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

const selectLoading = (state) => state.auth.loading;

const selectError = (state) => state.auth.error;



export {selectUser, selectIsAuthenticated, selectLoading, selectError};