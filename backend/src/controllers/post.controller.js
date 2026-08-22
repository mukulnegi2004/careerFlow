const postService = require("../services/post.service");


const createPost = async (req, res) => {
    const {userId} = req.user;
    const {content} = req.body;
    const imageUrl = req.file? req.file.path: "";
    const imagePublicId = req.file? req.file.filename: "";

    const post = await postService.createPostService({userId, content, imageUrl, imagePublicId});

    return res.status(201).json({
        success: true,
        post
    });
}

const getPost = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await postService.getPostService(page, limit);

    return res.status(200).json({
        success: true,
        ...data
    })
}


const deletePost = async (req, res) => {
    const {postId} = req.params;
    await postService.deletePostService(postId, req.user.userId);
    return res.status(200).json({
        success: true,
        message: "post Deleted"
    })
}

const toggleLike = async (req, res) => {
    const {postId} = req.params;
    const post = await postService.toggleLike(postId, req.user.userId);

    return res.status(201).json({
        success: true,
        data: post,
    });
}

const getUserPosts = async (req, res) => {
    const { userId } = req.params;

    const result = await postService.getUserPosts(userId , req.query);

    return res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        result
    });
};

module.exports = { createPost, getPost, deletePost, toggleLike, getUserPosts};




















































































