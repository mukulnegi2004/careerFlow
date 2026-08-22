import { createSlice } from "@reduxjs/toolkit";

import {
    fetchPostComments,
    addComment,
    removeComment
} from "./commentAPI";

const initialState = {
    commentsByPost: {},
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        clearComments: (state) => {
            state.commentsByPost = {};
        },
        clearCommentError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Get Comments
            .addCase(fetchPostComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsByPost[action.payload.postId] = action.payload.comments;
            })
            .addCase(fetchPostComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Comment
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                const { postId, comment } = action.payload;
                if (!state.commentsByPost[postId]) {
                    state.commentsByPost[postId] = [];
                }
                state.commentsByPost[postId].unshift(comment);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Comment
            .addCase(removeComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeComment.fulfilled, (state, action) => {
                state.loading = false;

                const { postId, comment } = action.payload;

                if (state.commentsByPost[postId]) {                  // If post's comments are currently present in Redux state, then filter out the deleted comment.
                    state.commentsByPost[postId] =
                        state.commentsByPost[postId].filter(
                            (c) => c._id !== comment._id
                        );
                }
            })
            .addCase(removeComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

});

export const {
    clearComments,
    clearCommentError,
} = commentSlice.actions;

export default commentSlice.reducer;