import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    generateProfileSummary,
    improvePost,
    getJobSuggestions,
    getReplySuggestions,
    careerChat,
} from "../../services/ai.service";

const fetchProfileSummary = createAsyncThunk(
    "ai/fetchProfileSummary",
    async (_, { rejectWithValue }) => {
        try {
            const response = await generateProfileSummary();

            return response.data.summary;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to generate profile summary"
            );
        }
    }
);

const fetchImprovedPost = createAsyncThunk(
    "ai/fetchImprovedPost",
    async (content, { rejectWithValue }) => {
        try {
            const response = await improvePost(content);

            return response.data.content;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to improve post"
            );
        }
    }
);

const fetchJobSuggestions = createAsyncThunk(
    "ai/fetchJobSuggestions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getJobSuggestions();

            return response.data.suggestions;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch job suggestions"
            );
        }
    }
);

const fetchReplySuggestions = createAsyncThunk(
    "ai/fetchReplySuggestions",
    async (chatId, { rejectWithValue }) => {
        try {
            const response = await getReplySuggestions(chatId);

            return response.data.suggestions.replies;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch reply suggestions"
            );
        }
    }
);


const fetchCareerChat = createAsyncThunk(
    "ai/fetchCareerChat",
    async (message, { rejectWithValue }) => {
        try {
            const response = await careerChat(message);

            return response.data.reply;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get AI response"
            );
        }
    }
);



export {fetchImprovedPost, fetchProfileSummary, fetchJobSuggestions, fetchReplySuggestions, fetchCareerChat};