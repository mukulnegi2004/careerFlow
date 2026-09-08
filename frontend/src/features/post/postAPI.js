import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllPosts, createPost, deletePost, likeUnlikePost, getUserPosts,} from "../../services/post.service";


const fetchAllPosts = createAsyncThunk(
    "post/fetchAllPosts",
    async ({ page = 1, limit = 5 } = {}, { rejectWithValue }) => {
        try {
            const response = await getAllPosts(page, limit);

            return {
                posts: response.data.posts,
                page,
                limit
            };

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch posts"
            );
        }
    }
);


const addPost = createAsyncThunk(
    "post/addPost",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await createPost(formData);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create post"
            );
        }
    }
);


const removePost = createAsyncThunk(
    "post/removePost",
    async (postId, { rejectWithValue }) => {
        try {
            await deletePost(postId);

            return postId;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete post"
            );
        }
    }
);


const toggleLikePost = createAsyncThunk(
    "post/toggleLikePost",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await likeUnlikePost(postId);
            console.log(response.data);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to like/unlike post"
            );
        }
    }
);


const fetchUserPosts = createAsyncThunk(
    "post/fetchUserPosts",
    async ( { userId, page = 1, limit = 5 }, { rejectWithValue }) => {
        try {
            const response = await getUserPosts( userId, page, limit);

            return {
                posts: response.data.result.posts,
                page,
                limit
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user posts"
            );
        }
    }
);

export {fetchAllPosts, fetchUserPosts, addPost, removePost, toggleLikePost};