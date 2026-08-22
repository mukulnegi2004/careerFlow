import api from "./axios";

const getAllPosts = (page = 1, limit = 5) => api.get(`/posts?page=${page}&limit=${limit}`);       //explore page

const createPost = (data) => api.post("/posts", data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const deletePost = (postId) => api.delete(`/posts/${postId}`);

const likeUnlikePost = (postId) => api.patch(`/posts/${postId}/like`);

const getUserPosts = (userId, page = 1, limit = 5) => api.get(`/posts/user/${userId}?page=${page}&limit=${limit}`);

export { getAllPosts, createPost, deletePost, likeUnlikePost, getUserPosts,};