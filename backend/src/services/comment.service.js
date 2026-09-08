const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const Notification = require("../models/notification.model");

const inValidateFeed = require("../redis/feedCache");

const ExpressError = require("../utils/apiError");


const createComment = async (userId, postId, text) => {
    const post = await Post.findById(postId);
    if(!post){
        throw new ExpressError("Post not found", 400);
    }

    const comment = await Comment.create({
        post: postId,
        author: userId,
        text
    })

    if(post.author.toString() != userId.toString()){
        await Notification.create({                        //send notification to author of post
            receiver: post.author,
            sender: userId,
            type: "comment",
            post: postId
        })
    }

    await inValidateFeed(userId);

    return await comment.populate("author", "name email profileImage headline");
}

const getPostComments = async (postId) => {
    const comments = await Comment.find({post: postId}).populate("author", "name email profileImage headline").sort({createdAt: -1});

    return comments;
}


const deleteComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);

    if(!comment){
        throw new ExpressError("comment not found", 400);
    }

    if(comment.author.toString() !== userId.toString()){
        throw new ExpressError("not authorized to delete this comment", 403);
    }

    await comment.deleteOne();

    await inValidateFeed(userId);

    return comment;
}

module.exports = {createComment, getPostComments, deleteComment};













