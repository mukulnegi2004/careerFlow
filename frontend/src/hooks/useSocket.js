import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    initiateSocketConnection,
    disconnectSocket
} from "../sockets/socket";

import { EVENTS } from "../sockets/events";

import {
    setUserOnline,
    setUserOffline,
    setOnlineUsers,
    addMessage
} from "../features/chat/chatSlice";

import {
    selectIsAuthenticated
} from "../features/auth/authSelectors";

import {
    selectCurrentChat
} from "../features/chat/chatSelectors";


const useSocket = () => {

    const dispatch = useDispatch();

    const isAuthenticated =
        useSelector(selectIsAuthenticated);

    const currentChat =
        useSelector(selectCurrentChat);


    const currentChatIdRef =
        useRef(null);


    // Keep latest current chat ID
    useEffect(() => {

        currentChatIdRef.current =
            currentChat?._id || null;

    }, [currentChat]);


    // Connect socket + register global listeners
    useEffect(() => {

        if (!isAuthenticated) return;


        const socket =
            initiateSocketConnection();


        // ================= RECEIVE MESSAGE =================

        const handleReceiveMessage = (message) => {

            if (
                String(message.chat) !==
                String(currentChatIdRef.current)
            ) {
                return;
            }

            dispatch(addMessage(message));
        };


        // ================= INITIAL ONLINE USERS =================

        const handleOnlineUsers = (userIds) => {

            dispatch(setOnlineUsers(userIds));

        };


        // ================= USER ONLINE =================

        const handleUserOnline = ({ userId }) => {

            dispatch(setUserOnline(userId));

        };


        // ================= USER OFFLINE =================

        const handleUserOffline = ({ userId }) => {

            dispatch(setUserOffline(userId));

        };


        // Register listeners

        socket.on(
            EVENTS.RECEIVE_MESSAGE,
            handleReceiveMessage
        );

        socket.on(
            EVENTS.ONLINE_USERS,
            handleOnlineUsers
        );

        socket.on(
            EVENTS.USER_ONLINE,
            handleUserOnline
        );

        socket.on(
            EVENTS.USER_OFFLINE,
            handleUserOffline
        );


        // ================= CLEANUP =================

        return () => {

            socket.off(
                EVENTS.RECEIVE_MESSAGE,
                handleReceiveMessage
            );

            socket.off(
                EVENTS.ONLINE_USERS,
                handleOnlineUsers
            );

            socket.off(
                EVENTS.USER_ONLINE,
                handleUserOnline
            );

            socket.off(
                EVENTS.USER_OFFLINE,
                handleUserOffline
            );

            disconnectSocket();
        };

    }, [isAuthenticated, dispatch]);

};


export default useSocket;