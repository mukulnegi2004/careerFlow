import {
    getSocket,
    updateSocketToken,
} from "./socket";

import {
    EVENTS,
} from "./events";

import {
    refreshAccessToken,
} from "../services/refreshAccessToken";


// =========================================================
// WAIT FOR SOCKET CONNECTION
// =========================================================

const waitForSocketConnection = (socket) => {

    return new Promise((resolve, reject) => {

        if (socket.connected) {

            resolve();

            return;
        }


        const handleConnect = () => {

            cleanup();

            resolve();

        };


        const handleError = (error) => {

            cleanup();

            reject(error);

        };


        const cleanup = () => {

            socket.off(
                "connect",
                handleConnect
            );

            socket.off(
                "connect_error",
                handleError
            );

        };


        socket.once(
            "connect",
            handleConnect
        );


        socket.once(
            "connect_error",
            handleError
        );


        socket.connect();

    });

};


// =========================================================
// REFRESH SOCKET CONNECTION
// =========================================================

const refreshSocketConnection = async (socket) => {

    console.log(
        "Refreshing socket access token..."
    );


    const newAccessToken =
        await refreshAccessToken();


    if (!newAccessToken) {

        throw new Error(
            "Unable to refresh access token"
        );

    }


    console.log(
        "New access token received"
    );


    // Update socket authentication
    updateSocketToken(
        newAccessToken
    );


    // Reconnect using new token
    if (socket.connected) {

        socket.disconnect();

    }


    await waitForSocketConnection(
        socket
    );


    console.log(
        "Socket reconnected with new token"
    );

};


// =========================================================
// SEND MESSAGE ONCE
// =========================================================

const emitMessage = (
    socket,
    messageData
) => {

    return new Promise(
        (resolve, reject) => {

            let settled = false;


            // Safety timeout
            const timeout = setTimeout(() => {

                if (settled) return;

                settled = true;

                reject(
                    new Error(
                        "Message send timed out"
                    )
                );

            }, 15000);


            socket.emit(
                EVENTS.SEND_MESSAGE,
                messageData,
                (response) => {

                    if (settled) return;

                    settled = true;

                    clearTimeout(timeout);


                    console.log(
                        "SEND_MESSAGE ACK:",
                        response
                    );


                    if (
                        !response ||
                        !response.success
                    ) {

                        const error =
                            new Error(
                                response?.error ||
                                "Failed to send message"
                            );


                        error.code =
                            response?.code;


                        reject(error);

                        return;
                    }


                    resolve(
                        response.message
                    );

                }
            );

        }
    );

};


// =========================================================
// SEND MESSAGE
// =========================================================

export const sendMessage = async ({
    chatId,
    text,
}) => {

    const socket =
        getSocket();


    if (!socket) {

        throw new Error(
            "Socket is not initialized"
        );

    }


    if (!chatId) {

        throw new Error(
            "Chat ID is required"
        );

    }


    if (!text?.trim()) {

        throw new Error(
            "Message cannot be empty"
        );

    }


    const requestId =
        crypto.randomUUID();


    const messageData = {

        chatId,

        text: text.trim(),

        requestId,
    };


    console.log(
        "Sending socket message:",
        messageData
    );


    // =====================================================
    // MAKE SURE SOCKET IS CONNECTED
    // =====================================================

    if (!socket.connected) {

        try {

            await waitForSocketConnection(
                socket
            );

        } catch (error) {

            console.log(
                "Socket connection failed. Refreshing token..."
            );


            await refreshSocketConnection(
                socket
            );

        }

    }


    // =====================================================
    // FIRST ATTEMPT
    // =====================================================

    try {

        const message =
            await emitMessage(
                socket,
                messageData
            );


        console.log(
            "Message sent successfully:",
            message
        );


        return message;

    } catch (error) {

        // =================================================
        // ACCESS TOKEN EXPIRED
        // =================================================

        if (
            error.code ===
            "AUTH_EXPIRED"
        ) {

            console.log(
                "Socket token expired. Refreshing..."
            );


            await refreshSocketConnection(
                socket
            );


            // =============================================
            // SEND SAME MESSAGE AGAIN
            // =============================================

            const message =
                await emitMessage(
                    socket,
                    messageData
                );


            console.log(
                "Message sent successfully after refresh:",
                message
            );


            return message;

        }


        throw error;

    }

};