<div align="center">

# 🚀 CareerFlow

### AI-Powered Professional Networking & Career Growth Platform

A full-stack **LinkedIn-inspired** social platform built with the **MERN stack**, supercharged with **AI features** (Groq), **real-time chat** (Socket.IO), and **Redis caching** for a fast, scalable feed experience.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-Caching-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Groq AI](https://img.shields.io/badge/Groq-AI%20Powered-F55036?style=flat-square)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](#-license)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://careerflow-ten-xi.vercel.app/)

**[🚀 Live Demo](https://careerflow-ten-xi.vercel.app/
)**

</div>

---

## 📖 About

**CareerFlow** is a professional networking platform (think *LinkedIn Clone++*) where users can build a profile, share posts, connect with other professionals, chat in real time, and lean on AI to level up their career — from writing a better bio to getting personalized job suggestions.

---

## ✨ Features

### 👤 Core Social
- 🔐 Secure JWT auth with **Access + Refresh Token** rotation
- 🧑‍💼 Rich profiles — bio, skills, education, experience, avatar
- 📝 Create posts with images (Cloudinary), like & comment
- 🌐 Personalized **Feed** (connections' posts) + **Explore** (global posts)
- 🔎 Search users, pagination everywhere
- 🤝 Send / accept / reject connection requests
- 🔔 Real-time notifications (likes, comments, connections, messages)

### 💬 Real-Time Chat
- 1-to-1 messaging powered by **Socket.IO**
- Online/offline presence tracking
- Typing indicators
- Offline message notifications

### 🤖 AI-Powered Tools (via Groq)
| Feature | What it does |
|---|---|
| **Profile Summary Generator** | Turns your skills/education/experience into a polished "About" bio |
| **Post Improver** | Rewrites your post to be more engaging, with emojis & hashtags |
| **Job Suggestions** | Analyzes your profile and suggests roles with match % and skill gaps |
| **Smart Reply Suggestions** | Suggests contextual chat replies based on conversation history |
| **Career Chat** | Conversational AI assistant for career advice |

### ⚡ Performance & Security
- **Redis caching** (Cache-Aside pattern) for the personalized feed with automatic invalidation
- **Helmet** for secure HTTP headers
- **Rate limiting** (global + strict login limiter to prevent brute-force)
- Centralized error handling & request logging

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Redux Toolkit + React Redux (state management)
- React Router v7
- Tailwind CSS 4
- Axios, Socket.IO Client
- React Hook Form, React Hot Toast

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Redis (caching)
- Socket.IO (real-time)
- JWT (jsonwebtoken) — access + refresh tokens
- Bcrypt (password hashing)
- Cloudinary + Multer (image uploads)
- Groq SDK (AI features)
- Joi (validation)
- Helmet + express-rate-limit (security)

---

## 📁 Project Structure

<details>
<summary><strong>Frontend (<code>frontend/src</code>)</strong></summary>

```
frontend/src/
├── app/            # Redux store config
├── assets/         # Images, icons, logos
├── layouts/        # MainLayout, AuthLayout, ChatLayout
├── pages/          # Route-level pages (Home, Profile, Chat, AI...)
├── routes/         # Protected / Public route wrappers
├── components/     # auth, common, post, profile, connection, chat, notification, ai
├── features/       # Redux Toolkit slices (auth, user, post, feed, chat, ai, ...)
├── services/       # Axios API service layer
├── sockets/        # Socket.IO client setup & handlers
├── hooks/          # useAuth, useSocket, useInfiniteScroll, useDebounce...
├── utils/          # Constants, validators, helpers
└── styles/         # Global CSS, Tailwind, animations
```
</details>

<details>
<summary><strong>Backend (<code>backend/src</code>)</strong></summary>

```
backend/src/
├── config/         # db, redis, cloudinary, groq, env
├── models/         # User, Post, Comment, Connection, Chat, Message, Notification
├── routes/         # REST API route definitions
├── controllers/    # Request handling
├── services/       # Business logic layer
├── sockets/        # Socket.IO server (chat, presence)
├── middlewares/    # auth, rate-limit, upload
├── redis/          # Cache utilities & feed cache invalidation
├── validators/     # Joi validation schemas
├── utils/          # jwt, apiError, asyncHandler
├── app.js          # Express app + middleware
├── server.js       # HTTP server + Socket.IO attach
└── index.js         # Entry point
```
</details>

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Cloudinary account (for image uploads)
- Groq API key (for AI features)

### 1️⃣ Clone the repo
```bash
git clone https://github.com/mukulnegi2004/careerFlow.git
cd careerFlow
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

REDIS_URL=your_redis_connection_url

GROQ_API_KEY=your_groq_api_key
```

Run the backend:
```bash
npm start
```
Server runs at `http://localhost:5000`

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```
App runs at `http://localhost:5173`

---

## 📡 API Overview

<details>
<summary><strong>🔐 Auth</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register + auto-login |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current logged-in user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout & revoke refresh token |
</details>

<details>
<summary><strong>📝 Posts & Comments</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts?page=&limit=` | Get all posts (paginated) |
| POST | `/api/posts` | Create post (image optional) |
| DELETE | `/api/posts/:postId` | Delete own post |
| PATCH | `/api/posts/:postId/like` | Like / unlike post |
| GET | `/api/posts/user/:userId` | Get a user's posts |
| GET | `/api/posts/me` | Get current user's posts |
| POST | `/api/comments/:postId` | Add comment |
| GET | `/api/comments/:postId` | Get post comments |
| DELETE | `/api/comments/:commentId` | Delete comment |
</details>

<details>
<summary><strong>👤 Users</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| PATCH | `/api/users/profile` | Update profile (skills, education, experience, image) |
| GET | `/api/users?page=&limit=` | Get all users |
| GET | `/api/users/search?q=` | Search users by name |
| GET | `/api/users/:userId` | Get another user's profile |
</details>

<details>
<summary><strong>🤝 Connections</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/connections/request/:receiverId` | Send connection request |
| PATCH | `/api/connections/accept/:requestId` | Accept request |
| PATCH | `/api/connections/reject/:requestId` | Reject request |
| GET | `/api/connections/pending` | Get pending requests |
| DELETE | `/api/connections/:connectionId` | Remove connection |
| GET | `/api/connections` | Get all connections |
</details>

<details>
<summary><strong>🌐 Feed</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed?page=&limit=` | Personalized feed (Redis cached) |
</details>

<details>
<summary><strong>💬 Chat</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat/create/:receiverId` | Create or get chat |
| GET | `/api/chat` | Get all chats of current user |
| GET | `/api/chat/:chatId` | Get a specific chat |
| GET | `/api/chat/messages/:chatId?page=&limit=` | Get chat messages (paginated) |
</details>

<details>
<summary><strong>🔔 Notifications</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | Get all notifications |
| PATCH | `/api/notifications/:notificationId/read` | Mark as read |
</details>

<details>
<summary><strong>🤖 AI (Groq)</strong></summary>

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/profile-summary` | Generate profile "About" summary |
| POST | `/api/ai/improve-post` | Improve post content |
| POST | `/api/ai/job-suggestions` | Get personalized job suggestions |
| POST | `/api/ai/:chatId/reply-suggestions` | Get smart chat reply suggestions |
| POST | `/api/ai/career-chat` | Career advice chatbot |
</details>

---

## 🔑 Authentication Flow

```
Register/Login
      │
      ▼
Generate Access Token (15 min) + Refresh Token (7 days)
      │
      ▼
Store Refresh Token in MongoDB
      │
      ▼
Frontend stores both tokens
      │
      ▼
Protected APIs use Access Token
      │
      ▼
Access Token expires ──▶ POST /api/auth/refresh
      │                        │
      │                        ▼
      │           Verify Refresh Token → Issue new
      │           Access + Refresh Token → Update DB
      │                        │
      ◄────────────────────────┘
      ▼
Continue using the app
      │
      ▼
Logout ──▶ Refresh Token revoked (set to null)
```

---

## ⚡ Feed Caching Strategy (Cache-Aside)

```
Client Request → Check Redis
       │
       ├── Cache Hit  → Return cached feed instantly
       │
       └── Cache Miss → Query MongoDB
                            │
                            ▼
                  Store in Redis (TTL: 5 min)
                            │
                            ▼
                     Return feed to client
```
Cache is auto-invalidated on new posts, deletes, likes/unlikes, and new comments — keeping feeds fresh without hammering the database.

---

## 🗺️ Roadmap

- [ ] Group / community pages
- [ ] Video posts & stories
- [ ] Push notifications (Web Push)
- [ ] Docker Compose setup for one-command local dev
- [ ] Unit & integration test coverage

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a PR.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
# Open a Pull Request 🚀
```

---

## 🌐 Live Demo

🚀 Try the application here: **[careerflow-ten-xi.vercel.app](https://careerflow-ten-xi.vercel.app/)**

---

## 📬 Connect with Me

<p>
<a href="https://github.com/mukulnegi2004"><img src="https://img.shields.io/badge/GitHub-mukulnegi2004-181717?style=flat-square&logo=github&logoColor=white" /></a>
<a href="https://www.linkedin.com/in/mukul-negi-431039378/"><img src="https://img.shields.io/badge/LinkedIn-Mukul%20Negi-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a>
<a href="mailto:mannunegi126@gmail.com"><img src="https://img.shields.io/badge/Email-mannunegi126%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white" /></a>
</p>

---

<div align="center">

### ⭐ If you like this project, give it a star — it helps a lot!

Made with ❤️ by [Mukul Negi](https://github.com/mukulnegi2004)

</div>
