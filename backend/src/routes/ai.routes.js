const express = require("express");
const router = express.Router();
const { validateImprovePost, validateCareerChat }= require("../validators/ai.validator");

const auth = require("../middlewares/auth.middleware");
const wrapAsync = require("../utils/asyncHandler");

const aiController = require('../controllers/ai.controller');

router.route("/profile-summary")
    .post(auth, wrapAsync(aiController.profileSummary));

router.route("/improve-post")
    .post(auth, validateImprovePost, wrapAsync(aiController.improvePost));

router.route("/job-suggestions")
    .post(auth, wrapAsync(aiController.jobSuggestions));

router.route("/career-chat")
    .post(auth, validateCareerChat, wrapAsync(aiController.careerChat));

router.route("/:chatId/reply-suggestions")
    .post(auth, wrapAsync(aiController.replySuggestion));



module.exports = router;