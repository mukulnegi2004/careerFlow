import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getPostComments,
    createComment,
    deleteComment
} from "../../services/comment.service";

// Get Comments
const fetchPostComments = createAsyncThunk(
    "comment/fetchPostComments",
    async (postId, thunkAPI) => {
        try {
            const { data } = await getPostComments(postId);

            return {
                postId,
                comments: data.comments,
            };

        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch comments"
            );
        }
    }
);

// Add Comment
const addComment = createAsyncThunk(
    "comment/addComment",
    async ({ postId, text }, thunkAPI) => {
        try {
            const { data } = await createComment(postId, text);

            return {
                postId,
                comment: data.comment,
            };

        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to add comment"
            );
        }
    }
);

const removeComment = createAsyncThunk(
    "comment/removeComment",

    async (commentId, thunkAPI) => {
        try {
            const { data } = await deleteComment(commentId);

            return {
                postId: data.comment.post,
                comment: data.comment,
            };

        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message ||
                "Failed to delete comment"
            );
        }
    }
);

export {addComment, fetchPostComments, removeComment};