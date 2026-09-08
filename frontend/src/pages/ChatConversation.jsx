import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaComments } from "react-icons/fa";

import {
    fetchChatById,
    fetchMessages,
} from "../features/chat/chatAPI";

import { clearMessages } from "../features/chat/chatSlice";

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
    const messagesLoading = useSelector(selectMessagesLoading);
    const currentPage = useSelector(selectCurrentPage);
    const hasMoreMessages = useSelector(selectHasMoreMessages);
    const currentUser = useSelector(selectUser);


    // =========================================================
    // REFS
    // =========================================================

    const containerRef = useRef(null);

    const previousScrollHeightRef = useRef(0);

    const loadingOlderRef = useRef(false);

    const initialLoadRef = useRef(true);


    // =========================================================
    // FETCH CHAT
    // =========================================================

    useEffect(() => {

        if (!chatId) return;


        const loadChat = async () => {

            try {

                dispatch(clearMessages());

                loadingOlderRef.current = false;

                initialLoadRef.current = true;

                previousScrollHeightRef.current = 0;


                const chat = await dispatch(
                    fetchChatById(chatId)
                ).unwrap();


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
    // MESSAGE SCROLL MANAGEMENT
    // =========================================================

    useLayoutEffect(() => {

        const container = containerRef.current;

        if (!container) return;


        // -----------------------------------------------------
        // OLDER MESSAGES LOADED
        // -----------------------------------------------------

        if (loadingOlderRef.current) {

            const newScrollHeight =
                container.scrollHeight;

            container.scrollTop =
                newScrollHeight -
                previousScrollHeightRef.current;

            loadingOlderRef.current = false;

            return;
        }


        // -----------------------------------------------------
        // INITIAL LOAD
        // -----------------------------------------------------

        if (
            initialLoadRef.current &&
            messages.length > 0
        ) {

            container.scrollTop =
                container.scrollHeight;

            initialLoadRef.current = false;

            return;
        }


        // -----------------------------------------------------
        // NEW MESSAGE
        // -----------------------------------------------------

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

        if (loadingOlderRef.current) return;


        // Load older messages when near top

        if (container.scrollTop > 60) {
            return;
        }


        previousScrollHeightRef.current =
            container.scrollHeight;

        loadingOlderRef.current = true;


        dispatch(
            fetchMessages({
                chatId: currentChat._id,
                page: currentPage + 1,
                limit: 20,
            })
        );

    };


    // =========================================================
    // CHAT LOADING
    // =========================================================

    if (!currentChat) {

        return (
            <div
                className="
                    flex
                    h-[calc(100dvh-130px)]
                    w-full
                    items-center
                    justify-center

                    bg-slate-50
                    dark:bg-slate-950

                    md:h-[calc(100dvh-64px)]
                "
            >
                <Loader />
            </div>
        );

    }


    // =========================================================
    // CHAT CONVERSATION
    // =========================================================

    return (

        <div
            className="
                flex
                w-full
                flex-col
                overflow-hidden

                bg-white
                text-slate-900

                transition-colors
                duration-300

                dark:bg-slate-950
                dark:text-white


                /* =============================================
                   MOBILE
                   Navbar     ≈ 64px
                   Bottom Nav ≈ 66px
                   ============================================= */

                h-[calc(100dvh-130px)]


                /* =============================================
                   DESKTOP
                   Navbar ≈ 64px
                   No bottom navigation
                   ============================================= */

                md:h-[calc(100dvh-64px)]


                /* =============================================
                   DESKTOP CARD
                   ============================================= */

                md:border
                md:border-slate-200
                md:shadow-xl
                md:shadow-slate-200/40

                md:dark:border-slate-800
                md:dark:shadow-black/20
            "
        >

            {/* =================================================
                CHAT HEADER
            ================================================= */}

            <ChatHeader
                chat={currentChat}
            />


            {/* =================================================
                MESSAGE AREA

                THIS IS THE ONLY SCROLLABLE AREA
            ================================================= */}

            <div
                ref={containerRef}
                onScroll={handleScroll}

                className="
                    min-h-0
                    min-w-0
                    flex-1

                    overflow-x-hidden
                    overflow-y-auto

                    overscroll-contain

                    bg-slate-50

                    px-3
                    py-3

                    sm:px-5
                    sm:py-5

                    dark:bg-slate-950

                    [scrollbar-width:thin]
                    [scrollbar-color:#94a3b8_transparent]

                    dark:[scrollbar-color:#475569_transparent]

                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-slate-300

                    dark:[&::-webkit-scrollbar-thumb]:bg-slate-700
                "
            >

                {/* =================================================
                    OLDER MESSAGES LOADING
                ================================================= */}

                {messagesLoading && (

                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2

                                py-3

                                text-xs
                                font-medium

                                text-slate-400

                                dark:text-slate-500
                            "
                        >

                            <span
                                className="
                                    h-3.5
                                    w-3.5

                                    animate-spin

                                    rounded-full

                                    border-2
                                    border-slate-300
                                    border-t-blue-500

                                    dark:border-slate-700
                                    dark:border-t-blue-400
                                "
                            />

                            Loading older messages...

                        </div>

                    )}


                {/* =================================================
                    INITIAL LOADING
                ================================================= */}

                {messagesLoading &&
                    messages.length === 0 && (

                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                            "
                        >
                            <Loader />
                        </div>

                    )}


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {messages.length > 0 && (

                    <div
                        className="
                            flex
                            min-h-full
                            flex-col
                            justify-end

                            space-y-2
                        "
                    >

                        {messages.map((message) => (

                            <MessageBubble
                                key={message._id}

                                message={message}

                                isOwn={
                                    String(
                                        message.sender?._id
                                    ) ===
                                    String(
                                        currentUser?._id
                                    )
                                }
                            />

                        ))}

                    </div>

                )}


                {/* =================================================
                    EMPTY CONVERSATION
                ================================================= */}

                {!messagesLoading &&
                    messages.length === 0 && (

                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                px-6
                            "
                        >

                            <div className="text-center">

                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-16
                                        w-16

                                        items-center
                                        justify-center

                                        rounded-2xl

                                        bg-blue-50
                                        text-xl
                                        text-blue-600

                                        shadow-sm

                                        dark:bg-blue-950/50
                                        dark:text-blue-400
                                    "
                                >
                                    <FaComments />
                                </div>


                                <h3
                                    className="
                                        mt-4
                                        text-sm
                                        font-semibold

                                        text-slate-800

                                        dark:text-slate-100
                                    "
                                >
                                    Start the conversation
                                </h3>


                                <p
                                    className="
                                        mt-1
                                        text-xs

                                        text-slate-500

                                        dark:text-slate-500
                                    "
                                >
                                    Send a message to get started.
                                </p>

                            </div>

                        </div>

                    )}

            </div>


            {/* =================================================
                MESSAGE INPUT

                shrink-0 ensures it NEVER gets pushed away
            ================================================= */}

            <div
                className="
                    shrink-0
                    w-full

                    bg-white

                    dark:bg-slate-900
                "
            >

                <MessageInput
                    chatId={currentChat._id}
                />

            </div>

        </div>
    );
};


export default ChatConversation;