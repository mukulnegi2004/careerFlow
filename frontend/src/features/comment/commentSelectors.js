const selectCommentsByPost = (postId) => (state) => state.comment.commentsByPost[postId];

const selectCommentLoading = (state) =>
    state.comment.loading;

const selectCommentError = (state) =>
    state.comment.error;


export {selectCommentsByPost, selectCommentLoading, selectCommentError};