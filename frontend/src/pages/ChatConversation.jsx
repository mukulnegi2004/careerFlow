import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    fetchChatById,
    fetchMessages,
} from "../features/chat/chatAPI";

import {
    clearMessages,
} from "../features/chat/chatSlice";

import {
    selectCurrentChat,
    selectMessages,
    selectMessagesLoading,
    selectCurrentPage,
    selectHasMoreMessages,
} from "../features/chat/chatSelectors";

import { selectUser } from "../features/auth/authSelectors";


import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import Loader from "../components/common/Loader";


const ChatConversation = () => {

    const { chatId } = useParams();

    const dispatch = useDispatch();


    // =========================================================
    // REDUX STATE
    // =========================================================

    const currentChat = useSelector(selectCurrentChat);

    const messages = useSelector(selectMessages);

    const messagesLoading = useSelector(
        selectMessagesLoading
    );

    const currentPage = useSelector(
        selectCurrentPage
    );

    const hasMoreMessages = useSelector(
        selectHasMoreMessages
    );

    const currentUser = useSelector(
        selectUser
    );


    // =========================================================
    // REFS
    // =========================================================

    const containerRef = useRef(null);

    const previousScrollHeightRef = useRef(0);

    const loadingOlderRef = useRef(false);


    // =========================================================
    // FETCH CHAT + FIRST PAGE OF MESSAGES
    // =========================================================

    useEffect(() => {

        if (!chatId) return;


        const loadChat = async () => {

            try {

                // -------------------------------------------------
                // CLEAR PREVIOUS CHAT'S MESSAGES
                // -------------------------------------------------

                dispatch(clearMessages());

                loadingOlderRef.current = false;

                previousScrollHeightRef.current = 0;


                // -------------------------------------------------
                // FETCH CURRENT CHAT BY ID
                // -------------------------------------------------

                const chat = await dispatch(fetchChatById(chatId)).unwrap();


                // -------------------------------------------------
                // FETCH FIRST PAGE OF MESSAGES
                // -------------------------------------------------

                dispatch(
                    fetchMessages({
                        chatId: chat._id,
                        page: 1,
                        limit: 20,
                    })
                );

            } catch (error) {

                console.error(
                    "Failed to load chat:",
                    error
                );

            }

        };


        loadChat();

    }, [chatId, dispatch]);



    // =========================================================
    // KEEP SCROLL POSITION
    // =========================================================

    useLayoutEffect(() => {

        const container = containerRef.current;

        if (!container) return;


        // =====================================================
        // OLDER MESSAGES WERE LOADED
        // =====================================================

        if (loadingOlderRef.current) {

            container.scrollTop =
                container.scrollHeight -
                previousScrollHeightRef.current;

            loadingOlderRef.current = false;

            return;
        }


        // =====================================================
        // INITIAL LOAD / NEW MESSAGE
        // =====================================================

        if (messages.length > 0) {

            container.scrollTop =
                container.scrollHeight;

        }

    }, [messages]);


    // =========================================================
    // LOAD OLDER MESSAGES
    // =========================================================

    const handleScroll = () => {

        const container = containerRef.current;

        if (!container) return;

        if (!currentChat) return;

        if (messagesLoading) return;

        if (!hasMoreMessages) return;


        // -----------------------------------------------------
        // ONLY LOAD WHEN USER REACHES TOP
        // -----------------------------------------------------

        if (container.scrollTop > 50) {
            return;
        }


        // -----------------------------------------------------
        // SAVE CURRENT SCROLL HEIGHT
        // -----------------------------------------------------

        previousScrollHeightRef.current =
            container.scrollHeight;


        loadingOlderRef.current = true;


        // -----------------------------------------------------
        // FETCH NEXT PAGE
        // -----------------------------------------------------

        dispatch(
            fetchMessages({
                chatId: currentChat._id,
                page: currentPage + 1,
                limit: 20,
            })
        );

    };


    // =========================================================
    // LOADING CURRENT CHAT
    // =========================================================

    if (!currentChat) {

        return (

            <div
                className="
                    h-[calc(100dvh-160px)]
                    sm:h-[calc(100vh-100px)]
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                "
            >

                <Loader />

            </div>

        );

    }


    // =========================================================
    // UI
    // =========================================================

    return (

        <div
            className="
                h-[calc(100dvh-160px)]
                sm:h-[calc(100vh-100px)]
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                overflow-hidden
                flex
                flex-col
            "
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <ChatHeader
                chat={currentChat}
            />


            {/* =================================================
                MESSAGES
            ================================================= */}

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="
                    flex-1
                    overflow-y-auto
                    bg-gray-50
                    px-3
                    sm:px-5
                    py-4
                    space-y-2
                "
            >

                {/* =================================================
                    OLDER MESSAGES LOADING
                ================================================= */}

                {messagesLoading &&
                    currentPage > 1 && (

                    <div
                        className="
                            text-center
                            text-xs
                            text-gray-400
                            py-2
                        "
                    >
                        Loading older messages...
                    </div>

                )}


                {/* =================================================
                    INITIAL MESSAGES LOADING
                ================================================= */}

                {messagesLoading &&
                    messages.length === 0 && (

                    <div
                        className="
                            flex
                            justify-center
                            py-6
                        "
                    >
                        <Loader />
                    </div>

                )}


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {messages.map((message) => (

                    <MessageBubble
                        key={message._id}
                        message={message}
                        isOwn={
                            String(message.sender?._id) ===
                            String(currentUser?._id)
                        }
                    />

                ))}


                {/* =================================================
                    EMPTY CONVERSATION
                ================================================= */}

                {!messagesLoading &&
                    messages.length === 0 && (

                    <div
                        className="
                            h-full
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <div className="text-center">

                            <div
                                className="
                                    w-14
                                    h-14
                                    mx-auto
                                    rounded-full
                                    bg-blue-50
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                "
                            >
                                👋
                            </div>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Start the conversation
                            </p>

                        </div>

                    </div>

                )}

            </div>


            {/* =================================================
                MESSAGE INPUT
            ================================================= */}

            <MessageInput
                chatId={currentChat._id}
            />

        </div>

    );

};


export default ChatConversation;