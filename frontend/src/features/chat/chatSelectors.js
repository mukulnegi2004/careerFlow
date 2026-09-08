const selectChats = (state) => state.chat.chats;

const selectCurrentChat = (state) => state.chat.currentChat;

const selectMessages = (state) => state.chat.messages;

const selectChatLoading = (state) => state.chat.loading;

const selectMessagesLoading = (state) => state.chat.messagesLoading;

const selectCurrentPage = (state) => state.chat.currentPage;

const selectHasMoreMessages = (state) => state.chat.hasMoreMessages;

const selectIsUserOnline = (userId) => (state) => state.chat.onlineUsers.includes(userId);


export { selectChats, selectCurrentChat, selectMessages, selectChatLoading, selectMessagesLoading, selectCurrentPage, selectHasMoreMessages, selectIsUserOnline,};