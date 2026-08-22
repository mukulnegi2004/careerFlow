import api from "./axios";

// These functions only make API requests using the Axios instance, return a Promise.

const registerUser = (data) => api.post("/auth/register", data);             //api.post return a promise, function simply return that promise

const loginUser = (data) => api.post("/auth/login", data);

const logoutUser = () => api.post("/auth/logout");

const getCurrUser = () => api.get("/auth/me");







export {registerUser, loginUser, logoutUser, getCurrUser};




