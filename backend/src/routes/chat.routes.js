const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");
const auth = require("../middlewares/auth.middleware");
const wrapAsync = require("../utils/asyncHandler");

router.route("/")
    .get(auth, wrapAsync(chatController.getUserChats));

router.route("/:chatId")
    .get(auth, wrapAsync(chatController.getChatById));

router.route("/create/:receiverId")
    .post(auth, wrapAsync(chatController.createChat))

router.route("/messages/:chatId")
    .get(auth, wrapAsync(chatController.getMessages));



module.exports = router;





















