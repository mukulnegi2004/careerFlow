const commentService = require("../services/comment.service");


const createComment = async(req, res) => {
    const {postId} = req.params;
    const {text} = req.body;
    const comment = await commentService.createComment(req.user.userId, postId, text);

    res.status(201).json({
        success: true,
        comment
    })
}

const getComments = async(req, res) => {
    const {postId} = req.params;
    const comments = await commentService.getPostComments(postId);

    res.status(200).json({
        success: true,
        comments
    })
}

const deleteComment = async (req, res) =>{
    const {commentId} = req.params;

    const comment = await commentService.deleteComment(commentId, req.user.userId);

    return res.status(200).json({
        success: true,
        message: "comment deleted successfully",
        comment
    })
}
module.exports = {createComment, getComments, deleteComment};


























