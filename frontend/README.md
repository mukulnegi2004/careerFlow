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


