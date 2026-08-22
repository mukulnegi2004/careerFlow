const jwt = require("jsonwebtoken");

const Message = require("../models/message.model");
const Chat = require("../models/chat.model");
const Notification = require("../models/notification.model");

const EVENTS = require("./event");

const {
    onlineUsers
} = require("./presence.socket");


const registerChatEvents = (io, socket) => {

    socket.on(
        EVENTS.SEND_MESSAGE,
        async (data) => {

            try {

                // =====================================================
                // VALIDATE DATA
                // =====================================================

                if (
                    !data?.chatId ||
                    !data?.text ||
                    !data?.requestId
                ) {
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
                            message: "authentication required"
                        }
                    );

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
                            message: "access token expired"
                        }
                    );

                    return;
                }


                // =====================================================
                // FIND CHAT
                // =====================================================

                const chat =
                    await Chat.findOne({
                        _id: data.chatId,
                        participants: decoded.userId
                    });


                if (!chat) {

                    console.log(
                        "Chat not found or user not participant"
                    );

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

                        text: data.text
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
                // ADD REQUEST ID
                // =====================================================

                const messageToSend = {

                    ...populatedMessage.toObject(),

                    requestId: data.requestId
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

                        type: "message"
                    });
                }


                // =====================================================
                // SEND BACK TO SENDER
                // =====================================================

                socket.emit(
                    EVENTS.RECEIVE_MESSAGE,
                    messageToSend
                );

            } catch (err) {

                console.error(
                    "SEND_MESSAGE error:",
                    err
                );

            }

        }
    );
};


module.exports = {
    registerChatEvents
};