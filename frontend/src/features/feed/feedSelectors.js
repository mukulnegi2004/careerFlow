const selectFeedPosts = (state) => state.feed.posts;
const selectFeedLoading = (state) => state.feed.loading;
const selectFeedError = (state) => state.feed.error;
const selectFeedPage = (state) => state.feed.page;
const selectFeedHasMore = (state) => state.feed.hasMore;

export {selectFeedError, selectFeedHasMore, selectFeedLoading, selectFeedPage, selectFeedPosts};