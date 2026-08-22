frontend/
│
├── public/                                  # Public static files
│   ├── favicon.ico                          # Browser tab icon
│   ├── logo.png                             # Application logo
│   └── robots.txt                           # Search engine crawler rules
│
├── src/
│   ├── app/                                 # Global app configuration
│   │   └── store.js                         # Configure Redux Toolkit store
│   │
│   ├── assets/                              # Static assets
│   │   ├── images/                          # Images used in UI
│   │   ├── icons/                           # SVG/icons
│   │   ├── avatars/                         # Default avatar images
│   │   └── logo.svg                         # SVG application logo
│   │
│   ├── layouts/                             # Shared page layouts
│   │   ├── MainLayout.jsx                   # Layout for authenticated pages
│   │   ├── AuthLayout.jsx                   # Layout for login/register pages
│   │   └── ChatLayout.jsx                   # Layout for chat module
│   │
│   ├── pages/                               # Route-level pages
│   │   ├── Home.jsx                         # Home/feed page
│   │   ├── Auth.jsx                        
│   │   ├── Login.jsx                        # Login page
│   │   ├── Register.jsx                     # Register page
│   │   ├── Profile.jsx                      # Logged-in user's profile
│   │   ├── EditProfile.jsx                  # Edit profile page
│   │   ├── Explore.jsx                     
│   │   ├── UserProfile.jsx                  # Other user's profile
│   │   ├── Search.jsx                       # Search users page
│   │   ├── Connections.jsx                  # Connections page
│   │   ├── Notifications.jsx                # Notifications page
│   │   ├── Chat.jsx                         # Chat page
│   │   ├── AI.jsx                           # AI tools page
│   │   └── NotFound.jsx                     # 404 page
│   │
│   ├── routes/                              # Routing configuration
│   │   ├── AppRoutes.jsx                    # Defines all routes
│   │   ├── ProtectedRoute.jsx               # Routes requiring authentication
│   │   └── PublicRoute.jsx                  # Routes for guests only
│   │
│   ├── components/                          # Reusable UI components
│   │   ├── auth/                        
│   │   │   ├── AuthToggle.jsx                
│   │   │   ├── RegisterForm.jsx                
│   │   │   ├── LoginForm.jsx          
│   │   │
│   │   ├── common/                          # Shared components
│   │   │   ├── Navbar.jsx                   # Top navigation bar
│   │   │   ├── Sidebar.jsx                  # Left sidebar
│   │   │   ├── RightSidebar.jsx             # Right sidebar
│   │   │   ├── Footer.jsx                   # Footer
│   │   │   ├── Button.jsx                   # Reusable button
│   │   │   ├── Input.jsx                    # Reusable input component
│   │   │   ├── Loader.jsx                   # Full page loader
│   │   │   ├── Spinner.jsx                  # Small loading spinner
│   │   │   ├── Modal.jsx                    # Reusable modal
│   │   │   ├── Avatar.jsx                   # User avatar
│   │   │   ├── Pagination.jsx               # Pagination component
│   │   │   ├── EmptyState.jsx               # No data found UI
│   │   │   ├── Error.jsx                    # Error display component
│   │   │   ├── ConfirmDialog.jsx            # Confirmation dialog
│   │   │   └── ThemeToggle.jsx              # Dark/light mode toggle
│   │   │
│   │   ├── post/                            # Post feature UI
│   │   │   ├── CreatePost.jsx               # Create post form
│   │   │   ├── ImprovePostButton.jsx        # Trigger AI improvement
│   │   │   ├── ImprovePostModal.jsx         # AI improved post content
│   │   │   ├── PostCard.jsx                 # Complete post component
│   │   │   ├── PostHeader.jsx               # User info & timestamp
│   │   │   ├── PostBody.jsx                 # Post content
│   │   │   ├── PostActions.jsx              # Like/comment/share actions
│   │   │   ├── LikeButton.jsx               # Like button
│   │   │   ├── CommentInput.jsx             # Add comment
│   │   │   ├── CommentCard.jsx              # Single comment
│   │   │   └── CommentList.jsx              # List of comments
│   │   │
│   │   ├── profile/                         # Profile feature UI
│   │   │   ├── ProfileHeader.jsx            # Profile banner
│   │   │   ├── AboutSection.jsx             # About section
│   │   │   ├── SkillsSection.jsx            # Skills section
│   │   │   ├── EducationSection.jsx         # Education details
│   │   │   ├── ExperienceSection.jsx        # Experience details
│   │   │   ├── EditProfileModal.jsx         # Edit profile modal
│   │   │   ├── ProfileStats.jsx             # Followers/posts/connections
│   │   │   └── ProfileSummaryModal.jsx      # AI profile summary
│   │   │
│   │   ├── connection/                      # Connection feature UI
│   │   │   ├── UserCard.jsx                 # User preview card
│   │   │   ├── ConnectionButton.jsx         # Connect/remove button
│   │   │   ├── PendingRequestCard.jsx       # Pending request card
│   │   │   └── ConnectionCard.jsx           # Connected user card
│   │   │
│   │   ├── chat/                            # Chat feature UI
│   │   │   ├── ChatSidebar.jsx              # Chat list
│   │   │   ├── ChatWindow.jsx               # Conversation area
│   │   │   ├── ChatHeader.jsx               # Chat header
│   │   │   ├── MessageBubble.jsx            # Single message
│   │   │   ├── MessageInput.jsx             # Message input
│   │   │   ├── TypingIndicator.jsx          # Typing animation
│   │   │   ├── OnlineBadge.jsx              # Online status
│   │   │   └── ReplySuggestions.jsx         # AI reply suggestions
│   │   │
│   │   ├── notification/                    # Notification feature UI
│   │   │   ├── NotificationCard.jsx         # Notification item
│   │   │   └── NotificationDropdown.jsx     # Notification dropdown
│   │   │
│   │   └── ai/                              # Standalone AI components
│   │       ├── CareerSuggestions.jsx        # AI career suggestions
│   │       └── AIButton.jsx                 # Generic AI button
│   │
│   ├── features/                            # Redux Toolkit feature modules
│   │   ├── auth/
│   │   │   ├── authSlice.js                 # Auth state & reducers
│   │   │   ├── authAPI.js                   # Auth async actions/API
│   │   │   └── authSelectors.js             # Auth selectors
│   │   │
│   │   ├── user/
│   │   │   ├── userSlice.js                 # User state & reducers
│   │   │   ├── userAPI.js                   # User async actions/API
│   │   │   └── userSelectors.js             # User selectors
│   │   │
│   │   ├── post/
│   │   │   ├── postSlice.js                 # Post state & reducers
│   │   │   ├── postAPI.js                   # Post async actions/API
│   │   │   └── postSelectors.js             # Post selectors
│   │   │
│   │   ├── comment/
│   │   │   ├── commentSlice.js              # Comment state & reducers
│   │   │   ├── commentAPI.js                # Comment async actions/API
│   │   │   └── commentSelectors.js          # Comment selectors
│   │   │
│   │   ├── feed/
│   │   │   ├── feedSlice.js                 # Feed state & reducers
│   │   │   ├── feedAPI.js                   # Feed async actions/API
│   │   │   └── feedSelectors.js             # Feed selectors
│   │   │
│   │   ├── connection/
│   │   │   ├── connectionSlice.js           # Connection state & reducers
│   │   │   ├── connectionAPI.js             # Connection async actions/API
│   │   │   └── connectionSelectors.js       # Connection selectors
│   │   │
│   │   ├── chat/
│   │   │   ├── chatSlice.js                 # Chat state & reducers
│   │   │   ├── chatAPI.js                   # Chat async actions/API
│   │   │   └── chatSelectors.js             # Chat selectors
│   │   │
│   │   ├── notification/
│   │   │   ├── notificationSlice.js         # Notification state & reducers
│   │   │   ├── notificationAPI.js           # Notification async actions/API
│   │   │   └── notificationSelectors.js     # Notification selectors
│   │   │
│   │   ├── ai/
│   │   │   ├── aiSlice.js                   # AI state & reducers
│   │   │   ├── aiAPI.js                     # AI async actions/API
│   │   │   └── aiSelectors.js               # AI selectors
│   │   │
│   │   └── theme/
│   │       ├── themeSlice.js                # Theme state
│   │       └── themeSelectors.js            # Theme selectors
│   │
│   ├── services/                            # Axios service layer
│   │   ├── axios.js                         # Axios instance & interceptors
│   │   ├── auth.service.js                  # Authentication APIs
│   │   ├── user.service.js                  # User APIs
│   │   ├── post.service.js                  # Post APIs
│   │   ├── comment.service.js               # Comment APIs
│   │   ├── feed.service.js                  # Feed APIs
│   │   ├── connection.service.js            # Connection APIs
│   │   ├── chat.service.js                  # Chat APIs
│   │   ├── notification.service.js          # Notification APIs
│   │   └── ai.service.js                    # AI APIs
│   │
│   ├── sockets/                             # Socket.IO client
│   │   ├── socket.js                        # Socket connection
│   │   ├── events.js                        # Socket event constants
│   │   └── chatSocket.js                    # Chat socket handlers
│   │
│   ├── hooks/                               # Custom React hooks
│   │   ├── useAuth.js                       # Authentication helper
│   │   ├── useSocket.js                     # Socket helper
│   │   ├── usePagination.js                 # Pagination logic
│   │   ├── useDebounce.js                   # Debounce input values
│   │   ├── useTheme.js                      # Theme management
│   │   └── useInfiniteScroll.js             # Infinite scroll logic
│   │
│   ├── utils/                               # Utility/helper functions
│   │   ├── constants.js                     # App constants
│   │   ├── storage.js                       # Local/session storage helpers
│   │   ├── formatDate.js                    # Date formatting
│   │   ├── validators.js                    # Validation helpers
│   │   ├── uploadImage.js                   # Image upload helper
│   │   └── helpers.js                       # Common utility functions
│   │
│   ├── styles/                              # Global styles
│   │   ├── globals.css                      # Global styles & Tailwind import
│   │   ├── scrollBar.css                    # Scrollbar styles
│   │   └── animations.css                   # Custom animations
│   │
│   ├── App.jsx                              # Root application component
│   └── main.jsx                             # React application entry point
│
├── .env                                     # Environment variables
├── .gitignore                               # Git ignored files
├── index.html                               # HTML entry file
├── package.json                             # Project metadata & dependencies
├── package-lock.json                        # Locked dependency versions
├── vite.config.js                           # Vite configuration
├── tailwind.config.js                       # Tailwind configuration
├── postcss.config.js                        # PostCSS configuration
└── README.md                                # Project documentation



-inside careerFlow folder to create frontend app                        "npm create vite@latest" 
-inside frontend folder          "npm install react-router-dom axios @reduxjs/toolkit react-redux socket.io-client react-hook-form react-hot-toast react-icons dayjs tailwindcss @tailwindcss/vite"



////////       Rule to remember
export { add, multiply } → use, import { add, multiply }
export default something → use, import anythingYouWant

module.exports = value -> use, const value = require()
module.exports = {a,b} -> use, const obj = require();                can access like obj.a
module.exports = {a,b} -> use, const {a, b} = require();             





//  Day1
-Completed the frontend setup by configuring Vite, Tailwind CSS, Redux Toolkit, BrowserRouter, and the application entry point.
-Created the complete project architecture with pages, layouts, common components, route wrappers, and Redux store.
-Configured application routing using React Router with MainLayout, AuthLayout, nested routes, and a NotFound page.




// Day2
-Configured Axios instance with request/response interceptors for JWT authentication and automatic token refresh.
-Implemented auth services, Redux async thunks (register, login, fetchCurrentUser, logout), auth slice, selectors, and store.
-Register and Login now automatically save both accessToken and refreshToken returned by the backend.
-The Refresh Token API is NOT called directly anywhere in the app; it is used only inside the Axios response interceptor when an access token expires.
-Completed frontend authentication flow: Component → Thunk → Service → Axios → Backend → Redux Store → Selectors.
-Flow:  Component ->  dispatch(login(data)) -> createAsyncThunk -> auth.service.js -> Backend API -> response.data -> login.fulfilled -> authSlice(Slice stores data in Redux state) -> Redux Store (Connect slice with Redux store) -> useSelector() -> Component UI





// Day 3
-Created reusable UI components: Input, Button, and Loader for consistent forms and loading states.
-Built LoginForm and RegisterForm using React Hook Form with client-side validation.
-Connected authentication forms with Redux Toolkit async thunks (login, register, logout).
-Used Redux selectors to read authentication state (user, loading, isAuthenticated, error).
-Configured React Router with PublicRoute, ProtectedRoute, nested routes, and layouts.
-Implemented AuthLayout for authentication pages and MainLayout with Navbar, Sidebar, and Outlet.
-Added authentication redirects using Navigate, useNavigate, replace, and useEffect.
-Built responsive Navbar and Sidebar using Link, NavLink, React Icons, and active route highlighting.
-Added toast notifications using react-hot-toast for login, registration, and logout feedback.
-Initialized the app with BrowserRouter, Redux Provider, Toaster, and organized routing structure.




// Day 4 
-Created complete Redux Toolkit architecture for User, Post, and AI features (service → thunk API → slice → selectors).
-Added Axios service functions for all User, Post, and AI backend APIs with authentication support.
-Implemented async thunks using createAsyncThunk for API calls, loading states, success handling, and error handling.
-Managed global state in slices using extraReducers and created reusable selectors for accessing Redux state.
-Configured Redux store with auth, user, post, and ai reducers for centralized state management.






-Tomorrow: Build Profile UI (current user profile), fetch current user's posts, and add Edit Profile page with routing, wiht ai to genmerate profile summary










//till profile.jsx working fine




























//auth flows

-case 1. User has no tokens
App loads
 ↓
fetchCurrentUser()
 ↓
No access/refresh token
 ↓
request fails / no session
 ↓
isAuthenticated = false
 ↓
ProtectedRoute
 ↓
Navigate → /auth

-case 2. User has a valid session
For example, user previously logged in and later opens the website again:

App loads
 ↓
accessToken exists
 ↓
fetchCurrentUser()
 ↓
/auth/me succeeds
 ↓
state.user = user
state.isAuthenticated = true
 ↓
ProtectedRoute allows <Outlet />
 ↓
Protected pages displayed

And if the access token has expired but the refresh token is still valid:

fetchCurrentUser()
 ↓
401
 ↓
Response interceptor
 ↓
refreshToken exists
 ↓
/auth/refresh succeeds
 ↓
new accessToken saved
 ↓
original /auth/me request retried
 ↓
success
 ↓
fetchCurrentUser.fulfilled
 ↓
isAuthenticated = true
 ↓
ProtectedRoute allows <Outlet />
 ↓
Protected pages displayed

So the user doesn't have to log in again.

-case 3. Both tokens are invalid/expired

fetchCurrentUser()
 ↓
401
 ↓
Response interceptor
 ↓
refreshToken exists
 ↓
/auth/refresh fails
 ↓
catch
 ↓
remove accessToken
remove refreshToken
 ↓
request rejects
 ↓
fetchCurrentUser.rejected
 ↓
isAuthenticated = false
 ↓
ProtectedRoute sees false
 ↓
Navigate → /auth