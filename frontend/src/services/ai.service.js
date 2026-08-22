import api from "./axios";

const generateProfileSummary = () => api.post("/ai/profile-summary");

const improvePost = (content) => api.post("/ai/improve-post", { content });

const getJobSuggestions = () => api.post("/ai/job-suggestions");

const getReplySuggestions = (chatId) => api.post(`/ai/${chatId}/reply-suggestions`);

const careerChat = (message) => api.post("/ai/career-chat", {message});

export {
    generateProfileSummary,
    improvePost,
    getJobSuggestions,
    getReplySuggestions,
    careerChat

};