const Connection = require("../models/connection.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const { getCache, setCache } = require("../redis/cache.service");


const getFeedService = async (userId, page = 1, limit = 10) => {

    const cacheKey = `feed:${userId}:${page}:${limit}`;

    const cachedFeed = await getCache(cacheKey);

    if (cachedFeed) {
        console.log("Feed served from Redis");
        return cachedFeed;
    }


    // ---------------------------------------------------------
    // GET CONNECTIONS
    // ---------------------------------------------------------

    const connections = await Connection.find({
        status: "accepted",
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    });


    // Get IDs of connected users
    const connectionIds = connections.map((conn) => {

        return conn.sender.toString() === userId.toString()
            ? conn.receiver
            : conn.sender;

    });


    // ---------------------------------------------------------
    // PAGINATION
    // ---------------------------------------------------------

    const skip = (page - 1) * limit;


    // Count connection posts
    const connectionPostCount = await Post.countDocuments({
        author: { $in: connectionIds }
    });


    let connectionPosts = [];
    let globalPosts = [];


    // ---------------------------------------------------------
    // CASE 1:
    // Page starts inside connection posts
    // ---------------------------------------------------------

    if (skip < connectionPostCount) {

        connectionPosts = await Post.find({
            author: { $in: connectionIds }
        })
            .populate("author", "name profileImage headline")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);


        // How many slots are still available on this page?
        const remaining = limit - connectionPosts.length;


        // If page still has empty slots,
        // start global posts from the beginning.
        if (remaining > 0) {

            globalPosts = await Post.find({
                author: {
                    $nin: [
                        ...connectionIds,
                        userId
                    ]
                }
            })
                .populate("author", "name profileImage headline")
                .sort({ createdAt: -1 })
                .skip(0)
                .limit(remaining);
        }

    }


    // ---------------------------------------------------------
    // CASE 2:
    // Page is completely inside global posts
    // ---------------------------------------------------------

    else {

        /*
            Example:

            connectionPostCount = 7
            page = 3
            limit = 5

            skip = 10

            globalSkip = 10 - 7
                       = 3

            So start from G4.
        */

        const globalSkip = skip - connectionPostCount;


        globalPosts = await Post.find({
            author: {
                $nin: [
                    ...connectionIds,
                    userId
                ]
            }
        })
            .populate("author", "name profileImage headline")
            .sort({ createdAt: -1 })
            .skip(globalSkip)
            .limit(limit);
    }


    // ---------------------------------------------------------
    // COMBINE POSTS
    // ---------------------------------------------------------

    const feed = [
        ...connectionPosts,
        ...globalPosts
    ];


    // ---------------------------------------------------------
    // COMMENT COUNTS
    // ---------------------------------------------------------

    const postIds = feed.map((post) => post._id);


    const commentCounts = await Comment.aggregate([

        {
            $match: {
                post: { $in: postIds }
            }
        },

        {
            $group: {
                _id: "$post",
                count: { $sum: 1 }
            }
        }

    ]);


    const commentCountMap = {};


    commentCounts.forEach((item) => {

        commentCountMap[item._id.toString()] = item.count;

    });


    // Add commentCount to each post
    const feedWithCommentCount = feed.map((post) => {

        const postObject = post.toObject();

        return {
            ...postObject,
            commentCount:
                commentCountMap[post._id.toString()] || 0
        };

    });


    // ---------------------------------------------------------
    // CACHE
    // ---------------------------------------------------------

    await setCache(cacheKey, feedWithCommentCount);

    console.log("📦 Feed stored in Redis");


    return feedWithCommentCount;
};


module.exports = {
    getFeedService
};