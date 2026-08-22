const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/asyncHandler");
const auth = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

router.route("/")
    .get(auth, wrapAsync(notificationController.getNotifications));

router.route("/:notificationId/read")
    .patch(auth, wrapAsync(notificationController.markRead));




module.exports = router;


































