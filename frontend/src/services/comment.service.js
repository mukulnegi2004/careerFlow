import api from "./axios";

const getPostComments = (postId) => api.get(`/comments/${postId}`);

const createComment = (postId, text) =>
    api.post(`/comments/${postId}`, {
        text,
    });

const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);

export {
    getPostComments,
    createComment,
    deleteComment
};