// ================= FRONTEND DEVELOPMENT PLAN (DAY WISE) =================


// Day 1 — Frontend Setup + Architecture
// - Setup Vite React project
// - Install required packages
// - Setup Tailwind CSS
// - Create frontend folder structure
// - Setup Redux Toolkit store
// - Configure Provider in main.jsx
// - Configure React Router


// Day 2 — Axios + Authentication Setup
// - Create axios instance with base URL
// - Add request interceptor for JWT token
// - Add response interceptor for refresh token handling
// - Create authSlice and authAPI
// - Implement:
//      POST /api/auth/register
//      POST /api/auth/login
//      GET  /api/auth/me
//      POST /api/auth/refresh
//      POST /api/auth/logout


// Day 3 — Login/Register UI
// - Create Login page
// - Create Register page
// - Create reusable Input component
// - Create Button component
// - Add react-hook-form validation
// - Add toast messages
// - Handle loading and API errors


// Day 4 — Protected Routes + Layout
// - Create ProtectedRoute
// - Create PublicRoute
// - Create MainLayout
// - Create AuthLayout
// - Build Navbar
// - Build Sidebar
// - Add authentication based routing


// Day 5 — User Profile Module
// - Setup userSlice and userAPI
// - Implement:
//      GET /api/users/me
//      GET /api/users/:userId
//      GET /api/users/search
// - Create Profile page
// - Create UserProfile page
// - Build profile components:
//      ProfileHeader
//      AboutSection
//      SkillsSection
//      EducationSection
//      ExperienceSection


// Day 6 — Edit Profile
// - Create EditProfile page
// - Implement profile update API
// - Handle multipart/form-data
// - Add profile image upload
// - Add skills management
// - Add education fields
// - Add experience fields
// AI->     Profile Summary Generation


// Day 7 — Posts Module
// - Setup postSlice and postAPI
// - Implement:
//      POST /api/posts
//      GET /api/posts
//      DELETE /api/posts/:postId
//      PATCH /api/posts/:postId/like
// - Create:
//      CreatePost
//      PostCard
//      PostHeader
//      PostBody
//      PostActions
// - Add image upload support
// AI->     Improve Post Content


// Day 8 — Personalized Feed
// - Setup feedSlice and feedAPI
// - Implement:
//      GET /api/feed
// - Add pagination
// - Add infinite scrolling
// - Add loading skeletons
// - Optimize feed rendering


// Day 9 — Comments System
// - Setup commentSlice and commentAPI
// - Implement:
//      POST /api/comments/:postId
//      GET /api/comments/:postId
// - Create:
//      CommentInput
//      CommentCard
//      CommentList
// - Integrate comments with PostCard


// Day 10 — Connection System
// - Setup connectionSlice and connectionAPI
// - Implement:
//      Send connection request
//      Accept request
//      Reject request
//      Remove connection
//      Get pending requests
//      Get connections
// - Create:
//      UserCard
//      ConnectionButton
//      PendingRequestCard
//      ConnectionCard


// Day 11 — Search + User Discovery
// - Create Search page
// - Implement user search API
// - Add debounce search
// - Add pagination
// - Display user profiles
// - Add connect button integration


// Day 12 — Chat UI
// - Setup chatSlice and chatAPI
// - Implement:
//      Create chat
//      Fetch chat messages
// - Create:
//      ChatSidebar
//      ChatWindow
//      ChatHeader
//      MessageBubble
//      MessageInput


// Day 13 — Socket.IO Real-Time Chat
// - Setup socket client
// - Add JWT socket authentication
// - Implement:
//      SEND_MESSAGE
//      RECEIVE_MESSAGE
//      USER_ONLINE
//      USER_OFFLINE
// - Add online status
// - Update messages in real-time


// Day 14 — Notifications
// - Setup notificationSlice and notificationAPI
// - Implement:
//      Get notifications
//      Mark notification as read
// - Create:
//      NotificationCard
//      NotificationDropdown
// - Add unread notification count
// - Connect notifications with socket events


// Day 15 — AI Features
// - Setup aiSlice and aiAPI
// - Implement:
//      Career Suggestions
// - Create:
//      ImprovePostModal
//      ProfileSummaryModal
//      CareerSuggestions
//      AIButton


// Day 16 — AI Chat Reply Suggestions
// - Implement:
//      POST /api/ai/:chatId/reply-suggestions
// - Add ReplySuggestions component
// - Integrate AI suggestions inside chat window
// - Handle loading and errors


// Day 17 — Dark Mode
// - Setup themeSlice
// - Create useTheme hook
// - Create ThemeToggle component
// - Configure Tailwind dark mode
// - Add dark styles across components
// - Store theme preference in localStorage


// Day 18 — Performance Optimization
// - Add React.lazy for route splitting
// - Add Suspense loading
// - Optimize renders using:
//      React.memo
//      useMemo
//      useCallback
// - Optimize images
// - Improve infinite scrolling


// Day 19 — Testing + Bug Fixing
// - Test authentication flow
// - Test refresh token flow
// - Test posts
// - Test comments
// - Test connections
// - Test chat
// - Test notifications
// - Test AI features
// - Fix UI and API bugs


// Day 20 — Deployment + Final Polish
// - Prepare production build
// - Configure environment variables
// - Deploy frontend
// - Connect frontend with deployed backend
// - Update README
// - Add screenshots
// - Record project demo
// - Add project to resume