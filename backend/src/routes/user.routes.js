const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const wrapAsync = require("../utils/asyncHandler");
const userController = require("../controllers/user.controller");
const validateUser = require("../validators/user.validator");

router.route("/")
    .get(auth, wrapAsync(userController.getAllUsers));

router.route("/profile")
    .patch(auth, upload.single("profileImage"), validateUser, wrapAsync(userController.updateProfile));

router.route("/search")
    .get(auth, wrapAsync(userController.searchUsers));

router.route("/:userId")
    .get(auth, wrapAsync(userController.getUserProfile));

module.exports = router;


























