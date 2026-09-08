import {createAsyncThunk} from "@reduxjs/toolkit";

import { updateUserProfile, getUserProfile, getAllUsers, searchUsers } from "../../services/user.service";

const editUserProfile = createAsyncThunk(
    "user/editUserProfile",
    async(data, {rejectWithValue}) =>{
        try{
            const response = await updateUserProfile(data);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Failed to update profile");
        }
    }
)

const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getUserProfile(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user profile"
            );
        }
    }
);

const fetchAllUsers = createAsyncThunk(
    "user/fetchAllUsers",
    async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {         //If no object is passed, the parameter becomes an empty object ({}), and then destructuring uses the default values for any missing properties.
        try {
            const response = await getAllUsers(page, limit);
            return {
                users: response.data.users,
                page,
                limit
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

const fetchSearchUsers = createAsyncThunk(
    "user/fetchSearchUsers",
    async ({ q = "", page = 1, limit = 10 } = {}, { rejectWithValue }) => {
        try {
            const response = await searchUsers(q, page, limit);
            return {
                users: response.data.users,
                page,
                limit
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to search users"
            );
        }
    }
);



export {editUserProfile, fetchUserProfile, fetchAllUsers, fetchSearchUsers};



















