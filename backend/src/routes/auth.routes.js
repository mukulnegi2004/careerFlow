const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const wrapAsync = require("../utils/asyncHandler");
const {validateRegister, validateLogin} = require("../validators/auth.validator")
// const {loginLimiter} = require("../middlewares/rateLimit.middleware");

router.route("/register")
    .post(validateRegister, wrapAsync(authController.register))

// router.route("/login")
//     .post(loginLimiter, validateLogin, wrapAsync(authController.login))
router.route("/login")
    .post(validateLogin, wrapAsync(authController.login))

router.route("/me")
    .get(auth, wrapAsync(authController.me))

router.route("/refresh")
    .post(wrapAsync(authController.refresh))

router.route("/logout")
    .post(auth, wrapAsync(authController.logout));

module.exports = router;


