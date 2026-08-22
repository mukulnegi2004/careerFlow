import {createSlice} from "@reduxjs/toolkit";
import { register, login, fetchCurrentUser, logout } from "./authAPI";         //Imports the async thunks which automatically dispatch register.pending, register.fulfilled, etc.

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),                     //!! operator converts any value into a boolean (true or false)
    loading: false,
    error: null
}

const authSlice =createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(state){                                                     //Removes old error messages.
            state.error = null;
        },
    },
    extraReducers: (builder) => {                                            //Handles actions coming from async thunks.
        builder
            //Register
            .addCase(register.pending, (state) => {                         //Runs immediately after "dispatch(register(data))" from component
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {              // Runs when the async thunk completes successfully.
                state.loading = false;

                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {                 //Runs if register thunk API fails
                state.loading = false;
                state.error = action.payload;                                  //payload is already the error message
            })
            //Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;

                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            //fetchCurr user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
                state.accessToken = null;
            })
            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;

                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const {clearError} = authSlice.actions;                               //Exports the normal reducers.

export default authSlice.reducer;                                              //Exports the reducer



















