const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const validatePost  = require("../validators/post.validator");
const wrapAsync = require("../utils/asyncHandler");
const upload = require("../middlewares/upload.middleware");


router.route("/")
    .get(wrapAsync(postController.getPost))
    .post(auth, upload.single("image"), validatePost, wrapAsync(postController.createPost));             //If no image file is uploaded, req.file will be undefined, After upload.single("image") runs, the uploaded image file is removed from req.body and its information (path, filename, etc.) becomes available in req.file, Other non-file form fields remain in req.body.

router.route("/:postId/like")
    .patch(auth, wrapAsync(postController.toggleLike));

router.route("/:postId")
    .delete(auth, wrapAsync(postController.deletePost));

router.route("/user/:userId")
    .get(auth, wrapAsync(postController.getUserPosts));                     //to get posts of a user



module.exports = router;








