import { createSlice } from "@reduxjs/toolkit";

import { fetchAllFeed } from "./feedAPI";
import { toggleLikePost } from "../post/postAPI";

const initialState = {
    posts: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        clearFeed: (state) => {
            state.posts = [];
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(fetchAllFeed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllFeed.fulfilled, (state, action) => {
                state.loading = false;
            
                const newPosts = action.payload.feed;
                const page = action.payload.page;
                const limit = action.payload.limit;
            
            
                if (page === 1) {                                   // First page → replace old posts
                    state.posts = newPosts;
                    state.hasMore = newPosts.length === limit;
                } else {
                    state.posts.push(...newPosts);                    // Next page → add posts  

                    if (newPosts.length < limit) {
                        state.hasMore = false;
                    }
                }
            
                state.page = page;                                  // Update current page
            })
            .addCase(fetchAllFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LIKE / UNLIKE                                                              //if like or unlike any post of feed then update state
            .addCase(toggleLikePost.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleLikePost.fulfilled, (state, action) => {
                const updatedPost = action.payload.data;

                state.posts = state.posts.map((post) => post._id === updatedPost._id ? updatedPost : post);
            })
            .addCase(toggleLikePost.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { clearFeed } = feedSlice.actions;

export default feedSlice.reducer;