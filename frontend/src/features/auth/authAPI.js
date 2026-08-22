import { createAsyncThunk } from "@reduxjs/toolkit";

import { registerUser, loginUser, logoutUser, getCurrUser } from "../../services/auth.service";            //Imports the service functions that actually make the API requests



const register = createAsyncThunk(                                    //register variable holding that thunk object
    "auth/register",                                                 //Creates a thunk named used by redux => auth/register, Redux Toolkit automatically creates three actions: auth/register/pending, auth/register/fulfilled, auth/register/rejected
    async (userData, {rejectWithValue}) => {                         //userData → data sent from the component.
        try{
            const response = await registerUser(userData);                                //API Call

            localStorage.setItem("accessToken", response.data.accessToken);               //save accessToken
            localStorage.setItem("refreshToken", response.data.refreshToken);

            return response.data;                                    //Redux Toolkit automatically dispatches register.fulfilled and action.payload
        }catch(error){
            return rejectWithValue(                                 // Instead of throwing an error, Redux dispatches register.rejected and action.payload which contains the error message
                error.response?.data?.message || "Registeration failed"
            )
        }
    }
)


const login = createAsyncThunk(
    "auth/login",
    async(userData, {rejectWithValue}) => {
        try{
            const response = await loginUser(userData);

            localStorage.setItem("accessToken", response.data.accessToken);                                  //save accessToken
            localStorage.setItem("refreshToken", response.data.refreshToken);

            return response.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || "login failed"
            );
        }
    }
)


const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async(_, {rejectWithValue}) => {
        try{
            const response = await getCurrUser();

            return response.data;
        }catch (error){
            return rejectWithValue(
                error.response?.data?.message || "failed to fetch user"
            );
        }
    }
)

const logout = createAsyncThunk(
    "auth/logout",
    async(_, {rejectWithValue}) => {
        try {
            await logoutUser();
            return true;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
)



export {login, register, fetchCurrentUser, logout};




















