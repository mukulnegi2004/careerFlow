backend/
│
├── src/
│   │
│   ├── config/                                   Handles all external connections & setup
│   │   ├── db.js                                 MongoDB connection setup (Mongoose)
│   │   ├── redis.js                              Redis connection (cache, queues, sessions)
│   │   ├── cloudinary.js                         File/image upload configuration
│   │   ├── groq.js                            
│   │   └── env.js                                Loads & validates environment variables
│   │
│   ├── models/                                   MongoDB schemas (data structure)
│   │   ├── user.model.js                         User profile, auth info
│   │   ├── post.model.js                         Posts (LinkedIn-style feed)
│   │   ├── comment.model.js                      Comments on posts
│   │   ├── connection.model.js                   Friend/follow connections
│   │   ├── chat.model.js                         Chat room metadata
│   │   ├── message.model.js                      Individual chat messages
│   │   └── notification.model.js                 Notifications stored in DB
│   │
│   ├── routes/                                   API endpoints definitions
│   │   ├── auth.routes.js                        login/register/logout
│   │   ├── user.routes.js                        profile, update user
│   │   ├── post.routes.js                        create/read/delete posts
│   │   ├── connection.routes.js                  follow/connect system
│   │   ├── chat.routes.js                        chat APIs
│   │   ├── feed.routes.js                        feed APIs
│   │   ├── comment.routes.js                     create/get comments
│   │   ├── notification.routes.js                fetch notifications
│   │   └── ai.routes.js                          AI features endpoints
│   │
│   ├── controllers/                              Handles, rreceive req, call service, send response
│   │   ├── auth.controller.js                    auth request handling
│   │   ├── user.controller.js                    user-related requests
│   │   ├── post.controller.js                    post logic
│   │   ├── connection.controller.js              connection handling
│   │   ├── chat.controller.js                    chat API logic
│   │   ├── feed.controller.js                    feed API logic
│   │   ├── comment.controller.js                 comment logic
│   │   ├── notification.controller.js            notification APIs
│   │   └── ai.controller.js                      AI request handling
│   │
│   ├── services/                                 Business logic (most important layer)
│   │   ├── auth.service.js                       signup/login logic
│   │   ├── user.service.js                       user operations
│   │   ├── post.service.js                       post creation/feed logic
│   │   ├── feed.service.js                       timeline algorithm (VERY important)
│   │   ├── chat.service.js                       chat room logic
│   │   ├── message.service.js                    message handling
│   │   ├── comment.service.js                    comment handling
│   │   ├── connection.service.js                 connection handling
│   │   ├── notification.service.js               notification creation + triggers
│   │   └── ai.service.js                         AI integration (OpenAI etc.)
│   │
│   ├── sockets/                                 Real-time communication (Socket.IO)
│   │   ├── index.js                             initializes socket server
│   │   ├── chat.socket.js                       real-time chat events
│   │   ├── presence.socket.js                   online/offline tracking
│   │   └── events.js                            event constants (clean naming)
│   │
│   ├── middlewares/                             Request processing layers
│   │   ├── auth.middleware.js                   JWT verification
│   │   ├── rateLimit.middleware.js              API request limiting
│   │   └── upload.middleware.js                 file upload handling
│   │
│   ├── utils/                                   Helper functions
│   │   ├── jwt.js                               token generation/verification
│   │   ├── apiError.js                          custom error class
│   │   ├── asyncHandler.js                      avoids try-catch repetition
│   │
│   ├── redis/                                   Redis-specific logic
│   │   ├── feedCache.js                         to remove outdated data from cache
│   │   └── cache.service.js                     caching logic (posts, users, feed)
│   │
│   ├── validators/                              Request validation rules
│   │   ├── auth.validator.js                    login/register validation
│   │   ├── ai.validator.js                   
│   │   ├── user.validator.js                    profile validation
│   │   ├── post.validator.js                    post validation
│   │   └── comment.validator.js                  comment validation     
│   │
│   ├── app.js                                   Express app setup, middleware registration, routes mounting
│   ├── server.js                                HTTP server creation, Socket.IO attach, server listen
│   └── index.js                                 entry point (starts everything)
│
├── .env                                         secrets (DB URL, JWT key, API keys)
├── package.json                                 dependencies & scripts
├── .gitignore                                   ignores node_modules, env, logs
└── README.md                                    project documentation



packages :  npm install express mongoose dotenv cors bcrypt jsonwebtoken nodemon socket.io cloudinary multer cookie-parser express-rate-limit joi
 multer-storage-cloudinary helmet redis groq-sdk

//     Backend Progress (Day 1)
-Setup Express app, HTTP server, Socket.IO, MongoDB connection.
-Added middleware: cors() and express.json().
-Created User model with profile fields.
-Implemented JWT utility (generateToken()).
-created custom ExpressError class in apiError utility
-created wrapAsync in asyncHandler utility
-Created auth middleware for token verification.
-Added register, login validation middleware for req data checking using Joi.
-Built POST, /api/auth/register, Added automatic login after register (returns JWT).
-Built POST, /api/auth/login.
-Built protected GET /api/auth/me.
-Logout handled on frontend by removing token;.


//     Backend Progress (Day 2)
-Created Post model with author, content, image, likes, and timestamps.
-Added post validation middleware for content checking using Joi.
-Built POST, /api/posts for creating posts (protected route).
-Built GET, /api/posts for fetching posts, Added pagination using ?page=1&limit=10, Implemented populate() for author details in posts.
-Built DELETE, /api/posts/:postId for deleting own posts only (protected route), delete image file from cloudinary as well.
-Built PATCH, /api/posts/:postId/like for like or unlike post (protected route).
-Organized logic into routes, controllers, services, and validators.


//     Backend Progress (Day 3)
-Created Comment model with post, author, text, and timestamps.
-Built comment validation middleware using Joi.
-Built POST, /api/comments/:postId for creating comments (protected).
-Built GET, /api/comments/:postId for fetching post comments.
-Organized logic into routes, controllers, services, and validators.


//      Backend Progress (Day 4)
-Setup cloudinary in config, Configured Cloudinary , Set up CloudinaryStorage for multer
-Upload middleware, Integrated multer with Cloudinary
-updated POST, /api/posts for creating posts with image upload
-updated createPost controller, createPostService and validatePost middleware, if validation fails and image uploaded on cloudinary then remove using publicId
-Built Patch, /api/users/profile for updating profile (protected).
-Built protected GET, /api/users?page=1&limit=5 to get all users,
-Built user validation middleware using Joi, if validation fails and profileImage uploaded on cloudinary then remove using publicId
-Organized logic into routes, controllers, services, and validators.



//      Backend Progress (Day 5)
-Created Connection model with sender, receiver, status (pending, accepted, rejected)
-Added compound unique index to prevent duplicate connection requests
-Built connection APIs, all are protected:
 POST   /api/connections/request/:receiverId       →   send request
 PATCH  /api/connections/accept/:requestId         →   accept request
 PATCH  /api/connections/reject/:requestId         →   reject request
 GET    /api/connections/pending                   →   get pending requests
 DELETE /api/connections/:connectionId             →   remove connection
 GET    /api/connections                           →   get accepted connections
-Implemented service layer logic for connection flow:
 → Prevent self-connection
 → Validate receiver exists
 → Handle existing connection states (pending/accepted/rejected)
 → Allow re-request after rejection
-Organized code into routes, controllers, services, and models




//     Backend Progress (Day 6)
-Built personalized posts Feed API (GET /api/feed), fetching connection posts first and supplementing with global posts when needed.
-Implemented pagination (page, limit) with author population, sorting by latest posts, and optimized feed generation logic.




//      Backend Progress (Day 7)
-Integrated Socket.IO with Express server for real-time communication
-Added JWT socket authentication and attached user data to socket
-Built user presence system using Map(userId → socketId)
-Implemented user:online and user:offline real-time events
-Tested socket connections using socket.io-client




//      Backend Progress (Day 8)
-Created Chat and Message models for one-to-one messaging.
-Built protected APIs to create/get chat and fetch chat messages.
-Implemented createOrGetChat() service to create chat which prevent duplicate chats creation and self-chat.
-Added paginated chat history to fetch chat messages with sender details using populate().
-Organized chat feature into routes, controllers, services, and models.
-Built real-time chat functionality using Socket.IO events for sending and receiving messages.
-Added message persistence, sender population, and online user-based message delivery.




//  Backend Progress (Day 9)
-Designed and implemented a Notification model to store user notifications with receiver, sender, type, related post, and read status.
-Built protected Notification APIs to fetch all notifications and mark individual notifications as read.
-Added connection request and connection acceptance notifications.
-Implemented like notifications while preventing self-notifications.
-Implemented comment notifications linked to the respective post while preventing self-notifications.
-Added offline message notifications, so users receive a notification only when they are offline.
-Populated sender and related post details in notification responses for better frontend rendering.
-Secured notification read operation by ensuring only the notification owner can mark it as read.
-Integrated the notification system across connection, post, comment, and chat modules while keeping the project architecture modular.




// Backend Progress (Day 10)
-Added environment variable validation to ensure all required configuration (MongoDB, JWT, Cloudinary, etc.) is available before the server starts.
-Improved application security by integrating Helmet for secure HTTP headers and Express Rate Limit to prevent API abuse and brute-force attacks.
-Implemented request logging, centralized 404 handling, and a global error-handling middleware for consistent debugging and API error responses.
-Added a dedicated login rate limiter (5 attempts per 15 minutes) using express-rate-limit to protect the login route from brute-force attacks.






// Backend Progress (Day 11)
-Implemented Refresh Token Authentication using JWT with separate Access Token (15m) and Refresh Token (7d) secrets.
-Updated User model to store the current refresh token and added environment variable validation for both JWT secrets.
-Enhanced register and login flows to generate both access and refresh tokens, storing the refresh token in MongoDB.
-Implemented POST /api/auth/refresh to verify the refresh token, generate a new access token, rotate the refresh token, and update it in the database.
-Implemented POST /api/auth/logout to revoke the stored refresh token, preventing further token refresh after logout.
-Updated authentication middleware to verify access tokens using the dedicated access token secret while keeping protected routes secure.
-Authentication Flow => Register/Login -> Generate Access Token (15 min), Generate Refresh Token (7 days) -> Store Refresh Token in MongoDB -> Frontend stores both tokens -> Protected APIs needs Access Token -> Access Token expires -> POST /api/auth/refresh (Verify Refresh Token) -> Generate New Access Token, Generate New Refresh Token -> Replace Refresh Token in DB -> Continue using the application -> Logout -> refreshToken = null
-We implemented Refresh Token Authentication because using only a short-lived Access Token (15 minutes) forces users to log in repeatedly, while making the Access Token long-lived (30 days) increases security risks if it is stolen. Refresh Tokens provide both a better user experience and improved security by allowing secure Access Token renewal.





// Backend progress (Day 12)
-MongoDb stos data in SSD/ Disk and Redis stores data in RAM so Redis is way faster than fetching data from database
-Integrated Redis into the backend for high-performance caching and added Redis environment variable validation.
-Configured a centralized Redis client with connection and error handling during application startup.
-Created reusable Redis cache utilities (getCache, setCache, deleteCache) to simplify caching operations across the application.
-Implemented Redis caching for the personalized Feed API using the Cache-Aside pattern.
-Generated unique cache keys in the format feed:userId:page:limit to cache paginated feeds separately for each user.
-Updated the Feed Service to first check Redis for cached data and return it immediately on a cache hit, reducing unnecessary MongoDB queries.
-On a cache miss, fetched the feed from MongoDB, stored the result in Redis with a 5-minute TTL (Time To Live) by which Even if cache invalidation fails, stale data only lives until the TTL expires, and returned the response to the client.
-Created a dedicated feed cache invalidation utility to remove all cached feed pages of a user whenever their feed becomes outdated.
-Integrated automatic cache invalidation after post creation, post deletion, post likes/unlikes, and new comments to ensure users always receive fresh feed data.
-Implemented the complete Cache-Aside flow:
 Client Request → Check Redis → Cache Hit → Return Cached Feed
 Client Request → Check Redis → Cache Miss → Query MongoDB → Store in Redis → Return Feed
-We implemented Redis Feed Caching because repeatedly generating personalized feeds from MongoDB is expensive and increases database load. Redis stores frequently accessed feed data in memory, significantly improving response time while reducing MongoDB queries. Cache invalidation ensures that users receive updated feed data whenever posts, likes, or comments change.




// Backend Progress (Day 13)
-Built GET, /api/users/search?q=mukul&page=1&limit=5
-Implemented a User Search API with authentication, supporting case-insensitive name search and excluding the current logged-in user.
-Added pagination to efficiently handle search results using page, limit, and skip.
-Built GET, /api/posts/me?page=1&limit=5 to fetch current user's posts.
-Implemented paginated user-specific post retrieval with author population, latest post sorting, and optimized database queries.



// Backend Progress (Day 14)
-Added Groq API integration with centralized configuration and environment validation.
-Enhanced the User model with embedded education and experience schemas to support AI-powered profile generation.
-Built POST /api/ai/profile-summary to generate professional LinkedIn "About" summaries using authenticated user data.
-updated PATCH /api/users/profile with authentication, image upload, Joi validation, and Cloudinary cleanup for profile updates.
-Enhanced profile management by supporting skills, education, and experience with nested validation and secure field whitelisting.
-Implemented multipart/form-data handling for profile updates by parsing JSON fields and validating them before saving to MongoDB.



// Backend Progress (Day 15)
-Built protected user profile APIs to fetch the current user's profile (GET /api/users/me) and any user's profile (GET /api/users/:userId).
-Enhanced user profile responses with posts count, accepted connections count, and connection status (self/pending/accepted/rejected/none) for seamless frontend profile rendering.
-Built AI-powered Post Enhancement API (POST /api/ai/improve-post) that rewrites user content into engaging, professional posts with improved readability, relevant emojis, and hashtags using the Groq API, Added Joi validation for AI post requests
-Implemented AI Career Suggestions API (POST /api/ai/job-suggestions) that analyzes the authenticated user's profile to generate personalized career recommendations with match percentage, reasoning, and suggested skills to improve with structured AI responses in JSON format for easy frontend integration.



// Backend Progress (Day 16)
-Built AI-powered Reply Suggestion API (POST /api/ai/:chatId/reply-suggestion) that generates three context-aware reply suggestions by analyzing the latest chat messages using the Groq API.
-Implemented secure chat validation to ensure only chat participants can request suggestions, fetching the last 10 messages to provide relevant conversation context while optimizing AI token usage.















