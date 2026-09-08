const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/asyncHandler");
const commentController = require("../controllers/comment.controller");
const validateComment = require("../validators/comment.validator");
const auth = require("../middlewares/auth.middleware");


router.route("/:postId")
    .get(wrapAsync(commentController.getComments))
    .post(auth, validateComment, wrapAsync(commentController.createComment))
    

router.route("/:commentId")
    .delete(auth, wrapAsync(commentController.deleteComment));


    
module.exports = router;




































