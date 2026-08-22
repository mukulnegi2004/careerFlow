//require() executes the entire file from top to bottom. If the file contains a function call, that function will also execute
const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const userRoutes = require("./routes/user.routes");
const connectionRoutes = require("./routes/connection.routes");
const feedRoutes = require("./routes/feed.routes");
const chatRoutes = require("./routes/chat.routes");
const notificationRoutes = require("./routes/notification.routes");
const aiRoutes = require("./routes/ai.routes");
const app = express();
const helmet = require("helmet");                    //Express security middleware, helps protect your application by automatically adding several HTTP security headers to every response
const {limiter} = require("./middlewares/rateLimit.middleware");
const ExpressError = require('./utils/apiError');

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(limiter);                                     //every incoming request goes through rate limiter first
app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {                            //logs http method and url for every incoming request
    console.log(`${req.method} ${req.url}`);
    next();
})



app.get('/', (req, res) => {
    res.send('Hello, World!');
});



app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);


app.use((req, res, next) => {
    throw new ExpressError("page not found", 404);           //not async so express will catch the error and pass it to custom error handler, no need of next()
})

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "internal server error"
    })
})




module.exports = app;