import { createSlice } from "@reduxjs/toolkit";

import { fetchAllPosts, addPost, removePost, toggleLikePost, fetchUserPosts, } from "./postAPI";


const initialState = {
    // All posts / Explore
    posts: [],
    postsPage: 1,
    postsLoading: false,
    hasMorePosts: true,

    //user's posts
    userPosts: [],
    userPostsPage: 1,
    userPostsLoading: false,
    hasMoreUserPosts: true,

    addPostLoading: false,                                  //for adding new post 

    error: null,
};


const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        clearPostError: (state) => {
            state.error = null;
        },
        clearPosts: (state) => {
            state.posts = [];
            state.postsPage = 1;
            state.hasMorePosts = true;
        },
        clearUserPosts: (state) => {
            state.userPosts = [];
            state.userPostsPage = 1;
            state.hasMoreUserPosts = true;
        },
    },


    extraReducers: (builder) => {
        builder

            // ALL POSTS   (explore)
            .addCase(fetchAllPosts.pending, (state) => {
                state.postsLoading = true;
                state.error = null;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.postsLoading = false;

                const newPosts = action.payload.posts;
                const page = action.payload.page;
                const limit = action.payload.limit

                if (page === 1) {
                    state.posts = newPosts;
                    state.hasMorePosts = newPosts.length === limit;
                } else {
                    state.posts.push(...newPosts);

                    if (newPosts.length < limit) {
                        state.hasMorePosts = false;
                    }
                }

                state.postsPage = page;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.postsLoading = false;
                state.error = action.payload;
            })


            // CREATE POST
            .addCase(addPost.pending, (state) => {
                state.addPostLoading = true;
                state.error = null;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.addPostLoading = false;
                state.error = null;

                const newPost = action.payload.post;

                state.posts.unshift(newPost);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.addPostLoading = false;
                state.error = action.payload;
            })


            // DELETE POST
            .addCase(removePost.pending, (state) => {
                state.error = null;
            })
            .addCase(removePost.fulfilled, (state, action) => {
                const postId = action.payload;

                state.posts = state.posts.filter(
                    (post) => post._id !== postId
                );

                state.userPosts = state.userPosts.filter(
                    (post) => post._id !== postId
                );
            })
            .addCase(removePost.rejected, (state, action) => {
                state.error = action.payload;
            })


            // LIKE / UNLIKE
            .addCase(toggleLikePost.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleLikePost.fulfilled, (state, action) => {
                const updatedPost = action.payload.data;

                state.posts = state.posts.map((post) =>
                    post._id === updatedPost._id ? updatedPost : post
                );

                state.userPosts = state.userPosts.map((post) =>
                    post._id === updatedPost._id ? updatedPost : post
                );
            })
            .addCase(toggleLikePost.rejected, (state, action) => {
                state.error = action.payload;
            })


            // USER POSTS
            .addCase(fetchUserPosts.pending, (state) => {
                state.userPostsLoading = true;
                state.error = null;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.userPostsLoading = false;
            
                const newPosts = action.payload.posts;
                const page = action.payload.page;
                const limit = action.payload.limit;
            
                if (page === 1) {                                // Fresh data from backend
                    state.userPosts = newPosts;
                    state.hasMoreUserPosts = newPosts.length === limit;
                } else {                                          // Pagination
                    state.userPosts.push(...newPosts);
            
                    if (newPosts.length < limit) {
                        state.hasMoreUserPosts = false;
                    }
                }
            
                state.userPostsPage = page;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.userPostsLoading = false;
                state.error = action.payload;
            });
    },
});


export const { clearPostError, clearPosts, clearUserPosts } = postSlice.actions;


export default postSlice.reducer;