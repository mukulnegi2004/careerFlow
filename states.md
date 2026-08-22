//  auth states
user: null,
accessToken: localStorage.getItem("accessToken") || null,
isAuthenticated: !!localStorage.getItem("accessToken"),                     //!! operator converts any value into a boolean (true or false)
loading: false,
error: null

actions are => thunks : login, register, fetchCurrentUser, logout        normal : clearError
selectors are => selectUser, selectIsAuthenticated, selectLoading, selectError



//  user states
userProfile: null,                                   //other userProfile
users: [],
usersPage: 1,
usersLoading: false,
hasMoreUsers: true,
searchResults: [],
searchPage: 1,
searchLoading: false,
hasMoreSearchResults: true,
loading: false,
error: null,

actions are => thunks : editUserProfile, fetchUserProfile, fetchAllUsers, fetchSearchUsers        normal : clearUsers, clearSearchResults, clearUserProfile, clearUserError
selectors are => selectUserProfile, selectUsers, selectUsersPage, selectUsersLoading, selectHasMoreUsers, selectSearchResults, selectSearchPage, selectSearchLoading, selectHasMoreSearchResults,selectUserLoading, selectUserError



//  post states
posts: [],
postsPage: 1,
postsLoading: false,
hasMorePosts: true,
userPosts: [],
userPostsPage: 1,
userPostsLoading: false,
hasMoreUserPosts: true,
addPostLoading: false,                           
error: null,

actions are => thunks : fetchAllPosts, fetchUserPosts, addPost, removePost, toggleLikePost       normal : clearPostError, clearPosts, clearUserPosts
selectors are => selectHasMoreUserPosts, selectUserPosts, selectUserPostsLoading, selectUserPostsPage, selectHasMorePosts, selectPostError, selectPosts, selectPostsLoading, selectPostsPage, selectAddPostLoading





//   comment states
commentsByPost: {},
loading: false,
error: null,

actions are => thunks : addComment, fetchPostComments, removeComment        normal : clearComments, clearCommentError,
selectors are => selectCommentsByPost, selectCommentLoading, selectCommentError









//  feed states 
posts: [],
page: 1,
hasMore: true,
loading: false,
error: null

actions are => thunks : fetchAllFeed        normal : clearFeed
selectors are => selectFeedError, selectFeedHasMore, selectFeedLoading, selectFeedPage, selectFeedPosts







//   AI states
profileSummary: "",
improvedPost: "",
jobSuggestions: [],
replySuggestions: [],
careerChat: {
  type: "",
  message: "",
},
loading: false,
error: null

actions are => thunks : fetchImprovedPost, fetchProfileSummary, fetchJobSuggestions, fetchReplySuggestions, fetchCareerChat       normal :  clearProfileSummary, clearImprovedPost, clearJobSuggestions, clearReplySuggestions, clearAIError, clearCareerChat
selectors are => selectAIError, selectAILoading, selectImprovedPost, selectJobSuggestions, selectProfileSummary, selectReplySuggestions, selectCareerChat







// Connection states
connections: [],                                                           // Accepted connections
pendingRequests: [],                                                       // Requests received by current user
loading: false,                                                            // General loading
actionLoading: false,                                                     // Loading specifically for actions
error: null

actions are => thunks : sendRequest, acceptRequest, rejectRequest, fetchPendingRequests, removeConnectionRequest, fetchConnections     
  normal :  clearError
selectors are => selectConnections, selectPendingRequests, selectConnectionLoading, selectConnectionActionLoading, selectConnectionError






// Notification states
notifications: [],
loading: false,
error: null

actions are => thunks : fetchNotifications, markAsRead           normal :  clearNotifications, clearNotificationError
selectors are => selectNotifications,  selectNotificationLoading, selectNotificationError, selectUnreadNotifications, selectReadNotifications






// chat states
chats: [],
currentChat: null,
messages: [],
currentPage: 1,
hasMoreMessages: true,
onlineUsers: [],
loading: false,
messagesLoading: false,
error: null,

actions are => thunks : createOrGetChat, fetchChats, fetchChatById, fetchMessages              normal :  clearMessages, addMessage, setUserOnline, setUserOffline, setOnlineUsers
selectors are => selectChats, selectCurrentChat, selectMessages, selectChatLoading, selectMessagesLoading, selectCurrentPage, selectHasMoreMessages, selectIsUserOnline












