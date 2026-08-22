import api from "./axios";

const getFeed = (page = 1, limit = 5) => api.get(`/feed?page=${page}&limit=${limit}`);


export {getFeed};











