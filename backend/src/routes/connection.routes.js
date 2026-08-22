const express = require("express");
const router = express.Router();

const connectionController = require("../controllers/connection.controller");
const auth = require("../middlewares/auth.middleware");
const wrapAsync = require("../utils/asyncHandler");



router.route("/request/:receiverId")
    .post(auth, wrapAsync(connectionController.sendRequest));

router.route("/accept/:requestId")
    .patch(auth, wrapAsync(connectionController.acceptRequest));

router.route("/reject/:requestId")
    .patch(auth, wrapAsync(connectionController.rejectRequest));

router.route("/pending")
    .get(auth, wrapAsync(connectionController.getPendingRequest));

router.route("/:connectionId")
    .delete(auth, wrapAsync(connectionController.removeConnection));

router.route("/")
    .get(auth, wrapAsync(connectionController.getConnections));


module.exports = router;

