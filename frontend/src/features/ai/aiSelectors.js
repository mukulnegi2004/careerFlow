const selectProfileSummary = (state) => state.ai.profileSummary;

const selectImprovedPost = (state) => state.ai.improvedPost;

const selectJobSuggestions = (state) => state.ai.jobSuggestions;

const selectReplySuggestions = (state) => state.ai.replySuggestions;

const selectAILoading = (state) => state.ai.loading;

const selectAIError = (state) => state.ai.error;

const selectCareerChat = (state) => state.ai.careerChat;


export{selectAIError, selectAILoading, selectImprovedPost, selectJobSuggestions, selectProfileSummary, selectReplySuggestions, selectCareerChat};