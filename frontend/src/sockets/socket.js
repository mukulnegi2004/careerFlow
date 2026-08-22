import { io } from "socket.io-client";


let socket = null;


// =========================================================
// CREATE SOCKET
// =========================================================

export const initiateSocketConnection = () => {

    if (socket) {
        return socket;
    }


    socket = io(
        import.meta.env.VITE_SOCKET_URL ||
        "http://localhost:5000",
        {

            auth: (callback) => {

                const token =
                    localStorage.getItem(
                        "accessToken"
                    );

                callback({
                    token
                });

            },

            transports: [
                "websocket"
            ]
        }
    );


    return socket;
};


// =========================================================
// GET SOCKET
// =========================================================

export const getSocket = () => {

    return socket;
};


// =========================================================
// UPDATE SOCKET TOKEN
// =========================================================

export const updateSocketToken = (token) => {

    if (!socket) {
        return;
    }

    socket.auth = {
        token
    };
};


// =========================================================
// DISCONNECT SOCKET
// =========================================================

export const disconnectSocket = () => {

    if (!socket) {
        return;
    }

    socket.disconnect();

    socket = null;
};