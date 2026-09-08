const jwt = require("jsonwebtoken");

const Message = require("../models/message.model");
const Chat = require("../models/chat.model");
const Notification = require("../models/notification.model");

const EVENTS = require("./event");

const {
    onlineUsers,
} = require("./presence.socket");


const registerChatEvents = (io, socket) => {

    socket.on(
        EVENTS.SEND_MESSAGE,
        async (data, callback) => {

            // =====================================================
            // SAFE ACKNOWLEDGEMENT
            // =====================================================

            const respond = (response) => {

                if (typeof callback === "function") {
                    callback(response);
                }

            };


            try {

                // =====================================================
                // VALIDATE DATA
                // =====================================================

                if (
                    !data?.chatId ||
                    !data?.text ||
                    !data?.requestId
                ) {

                    respond({
                        success: false,
                        error: "Invalid message data",
                    });

                    return;
                }


                // =====================================================
                // GET ACCESS TOKEN
                // =====================================================

                const token =
                    socket.handshake.auth?.token;


                if (!token) {

                    socket.emit(
                        EVENTS.MESSAGE_AUTH_ERROR,
                        {
                            requestId: data.requestId,
                            message: "authentication required",
                        }
                    );


                    respond({
                        success: false,
                        code: "AUTH_ERROR",
                        error: "Authentication required",
                    });

                    return;
                }


                // =====================================================
                // VERIFY ACCESS TOKEN
                // =====================================================

                let decoded;


                try {

                    decoded = jwt.verify(
                        token,
                        process.env.JWT_ACCESS_SECRET
                    );

                } catch (err) {

                    console.log(
                        "Socket access token expired/invalid"
                    );


                    socket.emit(
                        EVENTS.MESSAGE_AUTH_ERROR,
                        {
                            requestId: data.requestId,
                            message: "access token expired",
                        }
                    );


                    respond({
                        success: false,
                        code: "AUTH_EXPIRED",
                        error: "Access token expired",
                    });

                    return;
                }


                // =====================================================
                // FIND CHAT
                // =====================================================

                const chat =
                    await Chat.findOne({
                        _id: data.chatId,
                        participants: decoded.userId,
                    });


                if (!chat) {

                    console.log(
                        "Chat not found or user not participant"
                    );


                    respond({
                        success: false,
                        error: "Chat not found",
                    });

                    return;
                }


                // =====================================================
                // FIND RECEIVER
                // =====================================================

                const receiver =
                    chat.participants.find(
                        (participant) =>
                            participant.toString() !==
                            decoded.userId.toString()
                    );


                if (!receiver) {

                    console.log(
                        "Receiver not found"
                    );


                    respond({
                        success: false,
                        error: "Receiver not found",
                    });

                    return;
                }


                const receiverId =
                    receiver.toString();


                // =====================================================
                // CREATE MESSAGE
                // =====================================================

                const newMessage =
                    await Message.create({

                        chat: data.chatId,

                        sender: decoded.userId,

                        text: data.text.trim(),
                    });


                // =====================================================
                // POPULATE SENDER
                // =====================================================

                const populatedMessage =
                    await newMessage.populate(
                        "sender",
                        "name profileImage"
                    );


                // =====================================================
                // MESSAGE TO CLIENTS
                // =====================================================

                const messageToSend = {

                    ...populatedMessage.toObject(),

                    requestId: data.requestId,
                };


                // =====================================================
                // SEND TO RECEIVER
                // =====================================================

                const receiverSocketId =
                    onlineUsers.get(receiverId);


                if (receiverSocketId) {

                    io.to(receiverSocketId).emit(
                        EVENTS.RECEIVE_MESSAGE,
                        messageToSend
                    );

                } else {

                    // =================================================
                    // RECEIVER OFFLINE
                    // =================================================

                    await Notification.create({

                        receiver: receiverId,

                        sender: decoded.userId,

                        type: "message",
                    });

                }


                // =====================================================
                // SEND BACK TO SENDER
                //
                // This keeps your existing RECEIVE_MESSAGE flow.
                // useSocket can add the message to Redux.
                // =====================================================

                socket.emit(
                    EVENTS.RECEIVE_MESSAGE,
                    messageToSend
                );


                // =====================================================
                // ACKNOWLEDGE SUCCESS
                //
                // MessageInput does NOT need to wait for
                // RECEIVE_MESSAGE anymore.
                // =====================================================

                respond({

                    success: true,

                    message: messageToSend,
                });


            } catch (err) {

                console.error(
                    "SEND_MESSAGE error:",
                    err
                );


                respond({

                    success: false,

                    error:
                        err.message ||
                        "Failed to send message",
                });

            }

        }
    );

};


module.exports = {
    registerChatEvents,
};