import api from "./axios";

const updateUserProfile = (data) => api.patch("/users/profile", data);

const getUserProfile = (id) => api.get(`/users/${id}`);

const getAllUsers = (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`);

const searchUsers = (q, page = 1, limit = 10) => api.get(`/users/search?q=${q}&page=${page}&limit=${limit}`)




export {updateUserProfile, getUserProfile, getAllUsers, searchUsers};











