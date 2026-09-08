const selectUserProfile = (state) => state.user.userProfile;


const selectUsers = (state) => state.user.users;
const selectUsersPage = (state) => state.user.usersPage;
const selectUsersLoading = (state) => state.user.usersLoading;
const selectHasMoreUsers = (state) => state.user.hasMoreUsers;



const selectSearchResults = (state) => state.user.searchResults;
const selectSearchPage = (state) => state.user.searchPage;
const selectSearchLoading = (state) => state.user.searchLoading;
const selectHasMoreSearchResults = (state) => state.user.hasMoreSearchResults;

const selectUserLoading = (state) => state.user.loading;
const selectUserError = (state) => state.user.error;


export {selectUserProfile, selectUsers, selectUsersPage, selectUsersLoading, selectHasMoreUsers, selectSearchResults, selectSearchPage, selectSearchLoading, selectHasMoreSearchResults,selectUserLoading, selectUserError};