const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const wrapAsync = require("../utils/asyncHandler");
const feedController = require("../controllers/feed.controller");


router.route("/")
    .get(auth, wrapAsync(feedController.getFeed));



module.exports = router;


































