import { createSlice } from "@reduxjs/toolkit";

import {
    fetchProfileSummary,
    fetchImprovedPost,
    fetchJobSuggestions,
    fetchReplySuggestions,
    fetchCareerChat
} from "./aiAPI";

const initialState = {
    profileSummary: "",
    improvedPost: "",
    jobSuggestions: [],
    replySuggestions: [],

    careerChat: {
        type: "",
        message: "",
    },

    loading: false,
    error: null,
};

const aiSlice = createSlice({
    name: "ai",
    initialState,

    reducers: {
        clearProfileSummary: (state) => {
            state.profileSummary = "";
        },

        clearImprovedPost: (state) => {
            state.improvedPost = "";
        },

        clearJobSuggestions: (state) => {
            state.jobSuggestions = [];
        },

        clearReplySuggestions: (state) => {
            state.replySuggestions = [];
        },

        clearCareerChat: (state) => {
            state.careerChat = {
                type: "",
                message: "",
            };
        },

        clearAIError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Profile Summary
            .addCase(fetchProfileSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfileSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.profileSummary = action.payload;
            })
            .addCase(fetchProfileSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Improve Post
            .addCase(fetchImprovedPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchImprovedPost.fulfilled, (state, action) => {
                state.loading = false;
                state.improvedPost = action.payload;
            })
            .addCase(fetchImprovedPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Job Suggestions
            .addCase(fetchJobSuggestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobSuggestions.fulfilled, (state, action) => {
                state.loading = false;
                state.jobSuggestions = action.payload;
            })
            .addCase(fetchJobSuggestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reply Suggestions
            .addCase(fetchReplySuggestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReplySuggestions.fulfilled, (state, action) => {
                state.loading = false;
                state.replySuggestions = action.payload;
            })
            .addCase(fetchReplySuggestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // CAREER CHAT
            .addCase(fetchCareerChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCareerChat.fulfilled, (state, action) => {
                state.loading = false;

                state.careerChat = action.payload;
            })
            .addCase(fetchCareerChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const {
    clearProfileSummary,
    clearImprovedPost,
    clearJobSuggestions,
    clearReplySuggestions,
    clearAIError,
    clearCareerChat
} = aiSlice.actions;

export default aiSlice.reducer;