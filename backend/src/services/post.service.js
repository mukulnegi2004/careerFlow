const { cloudinary } = require("../config/cloudinary");
const Post = require("../models/post.model");
const ExpressError = require("../utils/apiError");
const Notification = require("../models/notification.model");
const inValidateFeed = require("../redis/feedCache");
const Comment = require("../models/comment.model");


const createPostService = async (data) => {
    const {userId, content, imageUrl, imagePublicId} = data;
    const post = await Post.create({
        author: userId, 
        content, 
        image: imageUrl,
        filename: imagePublicId
    });

    const result = await post.populate("author", "name email profileImage");
    return {
        ...result.toObject(),
        commentCount: 0
    };
}


const getPostService = async (page, limit) => {
    const skip = (page-1) * limit;                                             //Calculate how many posts to skip beginning posts

    const posts = await Post.find().populate("author", "name email headline profileImage").sort({createdAt: -1}).skip(skip).limit(limit);   //Sort newest posts first (descending), Skip previous page posts, Limit number of posts means only return limit no. of posts
    

    const totalPosts = await Post.countDocuments();                             //Count total posts in Post collection

    // Get comment counts for only these posts
    const postIds = posts.map(post => post._id);

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

    // Convert into easy lookup object
    const countMap = {};

    commentCounts.forEach(item => {
        countMap[item._id.toString()] = item.count;
    });

    // Add commentCount to every post
    const postsWithCommentCount = posts.map(post => ({
        ...post.toObject(),
        commentCount: countMap[post._id.toString()] || 0
    }));

    return {
        posts: postsWithCommentCount,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
    };
}


const deletePostService = async (postId, userId) => {
    const post = await Post.findById(postId);

    if(!post){
        throw new ExpressError("Post not found", 404);
    }

    if(post.author.toString() !== userId){
        throw new ExpressError("You are not allowed to delete this post", 403);
    }

    if(post.filename){
        try{
            await cloudinary.uploader.destroy(post.filename);                              //also delete image file from cloudinary
        }catch(deleteErr){
            console.log("cloudinary cleanup failed:", deleteErr);
        }
    }

    await post.deleteOne();
}


const toggleLike = async(postId, userId) => {
    const post = await Post.findById(postId);
    if(!post){
        throw new ExpressError("post not found", 400);
    }

    const alreadyLiked = post.likes.includes(userId);

    if(alreadyLiked){                                               //if already like than remove like
        post.likes = post.likes.filter((id) => {
            return id.toString() !== userId.toString();
        })
    }else{                                          //if not liked make it like and send notfication to author of post if author is not curr user
        if(post.author.toString() !== userId.toString()){
            await Notification.create({
                receiver: post.author,
                sender: userId,
                type: "like",
                post: postId
            });
        }
        post.likes.push(userId);
    }

    await post.save();

    const commentCount = await Comment.countDocuments({
        post: postId
    });

    await post.populate(
        "author",
        "name email profileImage headline"
    );

    inValidateFeed(userId);

    return {
        ...post.toObject(),
        commentCount
    };
}


const getUserPosts = async (userId, query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;

    const skip = (page - 1) * limit;

    const posts = await Post.find({
        author: userId
    })
        .populate("author", "name profileImage headline")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalPosts = await Post.countDocuments({
        author: userId
    });

    const postIds = posts.map(post => post._id);

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

    const countMap = {};

    commentCounts.forEach(item => {
        countMap[item._id.toString()] = item.count;
    });

    const postsWithCommentCount = posts.map(post => ({
        ...post.toObject(),
        commentCount: countMap[post._id.toString()] || 0
    }));

    return {
        posts: postsWithCommentCount,

        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
            limit
        }
    };
};


module.exports = {createPostService, getPostService, deletePostService, toggleLike, getUserPosts};












