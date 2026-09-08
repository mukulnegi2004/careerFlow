import { createSlice } from "@reduxjs/toolkit";

import {
    editUserProfile,
    fetchUserProfile,
    fetchAllUsers,
    fetchSearchUsers,
} from "./userAPI";

const initialState = {
    userProfile: null,                                   //other userProfile

    // All users
    users: [],
    usersPage: 1,
    usersLoading: false,
    hasMoreUsers: true,

    // Search results
    searchResults: [],
    searchPage: 1,
    searchLoading: false,
    hasMoreSearchResults: true,

    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
            state.searchPage = 1;
            state.hasMoreSearchResults = true;
        },
        clearUsers: (state) => {
            state.users = [];
            state.usersPage = 1;
            state.hasMoreUsers = true;
        },
        clearUserProfile: (state) => {
            state.userProfile = null;
        },
        clearUserError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Edit Profile
            .addCase(editUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Other User Profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload.data;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // All Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.usersLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.usersLoading = false;

                const newUsers = action.payload.users;
                const page = action.payload.page;
                const limit = action.payload.limit;

                if (page === 1) {
                    state.users = newUsers;                                  // First page → replace
                    state.hasMoreUsers = newUsers.length === limit;
                } else {
                    state.users.push(...newUsers);                         // Next pages → append

                    if (newUsers.length < limit) {
                        state.hasMoreUsers = false;
                    }
                }

                state.usersPage = page;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.error = action.payload;
            })

            // Search Users
            .addCase(fetchSearchUsers.pending, (state) => {
                state.searchLoading = true;
                state.error = null;
            })
            .addCase(fetchSearchUsers.fulfilled, (state, action) => {
                state.searchLoading = false;

                const newUsers = action.payload.users;
                const page = action.payload.page;
                const limit = action.payload.limit;

                if (page === 1) {                                                             // New search / first page
                    state.searchResults = newUsers;

                    state.hasMoreSearchResults = newUsers.length === limit;
                } else {
                    state.searchResults.push(...newUsers);                                      // Next search page

                    if (newUsers.length < limit) {
                        state.hasMoreSearchResults = false;
                    }
                }

                state.searchPage = page;
            })
            .addCase(fetchSearchUsers.rejected, (state, action) => {
                state.searchLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUsers, clearSearchResults, clearUserProfile, clearUserError,
} = userSlice.actions;

export default userSlice.reducer;