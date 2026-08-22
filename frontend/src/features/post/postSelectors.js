const selectPosts = (state) =>
    state.post.posts;

const selectPostsPage = (state) =>
    state.post.postsPage;

const selectPostsLoading = (state) =>
    state.post.postsLoading;

const selectHasMorePosts = (state) =>
    state.post.hasMorePosts;


const selectUserPosts = (state) =>
    state.post.userPosts;

const selectUserPostsPage = (state) =>
    state.post.userPostsPage;

const selectUserPostsLoading = (state) =>
    state.post.userPostsLoading;

const selectHasMoreUserPosts = (state) =>
    state.post.hasMoreUserPosts;


const selectAddPostLoading = (state) =>state.post.addPostLoading;

const selectPostError = (state) =>
    state.post.error;


export {selectHasMoreUserPosts, selectUserPosts, selectUserPostsLoading, selectUserPostsPage, selectHasMorePosts, selectPostError, selectPosts, selectPostsLoading, selectPostsPage, selectAddPostLoading}