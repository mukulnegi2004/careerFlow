import {
    getSocket,
    updateSocketToken
} from "./socket";

import {
    EVENTS
} from "./events";

import {
    refreshAccessToken
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
// SEND MESSAGE
// =========================================================

export const sendMessage = async ({
    chatId,
    text
}) => {

    const socket = getSocket();


    if (!socket) {

        throw new Error(
            "Socket is not initialized"
        );

    }


    const requestId =
        crypto.randomUUID();


    const messageData = {

        chatId,

        text,

        requestId
    };


    return new Promise(
        (resolve, reject) => {

            let retried = false;


            // =====================================================
            // CLEANUP
            // =====================================================

            const cleanup = () => {

                socket.off(
                    EVENTS.MESSAGE_AUTH_ERROR,
                    handleAuthError
                );

                socket.off(
                    EVENTS.RECEIVE_MESSAGE,
                    handleReceiveMessage
                );

            };


            // =====================================================
            // SUCCESS
            // =====================================================

            const handleReceiveMessage = (message) => {

                if (
                    message.requestId !==
                    requestId
                ) {
                    return;
                }


                cleanup();


                resolve(message);

            };


            // =====================================================
            // AUTH ERROR
            // =====================================================

            const handleAuthError = async (data) => {

                if (
                    data.requestId !==
                    requestId
                ) {
                    return;
                }


                // =================================================
                // PREVENT INFINITE RETRY
                // =================================================

                if (retried) {

                    cleanup();

                    reject(
                        new Error(
                            "Message authentication failed"
                        )
                    );

                    return;
                }


                retried = true;


                try {

                    console.log(
                        "Access token expired. Refreshing..."
                    );


                    // =============================================
                    // REFRESH ACCESS TOKEN
                    // =============================================

                    const newAccessToken =
                        await refreshAccessToken();


                    console.log(
                        "New access token received"
                    );


                    // =============================================
                    // UPDATE SOCKET AUTH
                    // =============================================

                    updateSocketToken(
                        newAccessToken
                    );


                    // =============================================
                    // RECONNECT SOCKET
                    // =============================================

                    if (socket.connected) {

                        socket.disconnect();

                    }


                    await waitForSocketConnection(
                        socket
                    );


                    console.log(
                        "Socket reconnected with new token"
                    );


                    // =============================================
                    // SEND SAME MESSAGE AGAIN
                    // =============================================

                    socket.emit(
                        EVENTS.SEND_MESSAGE,
                        messageData
                    );

                } catch (error) {

                    cleanup();

                    reject(error);

                }

            };


            // =====================================================
            // REGISTER LISTENERS
            // =====================================================

            socket.on(
                EVENTS.MESSAGE_AUTH_ERROR,
                handleAuthError
            );


            socket.on(
                EVENTS.RECEIVE_MESSAGE,
                handleReceiveMessage
            );


            // =====================================================
            // FIRST SEND
            // =====================================================

            socket.emit(
                EVENTS.SEND_MESSAGE,
                messageData
            );

        }
    );

};