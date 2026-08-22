import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUser } from "../features/auth/authSelectors";

import { fetchChats } from "../features/chat/chatAPI";
import { selectChats, selectChatLoading, selectIsUserOnline, } from "../features/chat/chatSelectors";

import OnlineBadge from "../components/chat/OnlineBadge";


const Chat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chats = useSelector(selectChats);
    const loading = useSelector(selectChatLoading);
    const currentUser = useSelector(selectUser);

    const [search, setSearch] = useState("");

    useEffect(() => {                                                                         // FETCH CHATS

        dispatch(fetchChats());

    }, [dispatch]);



    const getOtherParticipant = (chat) => {                                // GET OTHER PARTICIPANT

        return chat.participants?.find(
            (participant) => String(participant._id) !== String(currentUser?._id)
        );

    };

    const filteredChats = useMemo(() => {                                              // SEARCH
        const query = search.trim().toLowerCase();

        if (!query) {
            return chats;
        }

        return chats.filter((chat) => {

            const otherUser = getOtherParticipant(chat);

            return otherUser?.name?.toLowerCase().includes(query);
        });

    }, [chats, search, currentUser]);


    const handleSelectChat = (chat) => {                                       // OPEN CHAT
        navigate(`/chat/${chat._id}`);
    };


    return (

        <div className="w-full max-w-3xl mx-auto">

            <div
                className="
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

                <div
                    className="
                        px-5
                        pt-5
                        pb-4
                        border-b
                        border-gray-100
                        shrink-0
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <h1
                                className="
                                    text-xl
                                    font-semibold
                                    text-gray-900
                                "
                            >
                                Messages
                            </h1>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                "
                            >
                                Your conversations
                            </p>

                        </div>


                        {/* Conversation count */}

                        {!loading && chats.length > 0 && (

                            <span
                                className="
                                    min-w-7
                                    h-7
                                    px-2
                                    rounded-full
                                    bg-blue-50
                                    text-blue-600
                                    text-xs
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                {chats.length}
                            </span>

                        )}

                    </div>


                    {/* =================================================
                        SEARCH
                    ================================================= */}

                    {chats.length > 0 && (

                        <div className="relative mt-4">

                            <svg
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    w-4
                                    h-4
                                    text-gray-400
                                "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="
                                        m21 21-4.35-4.35
                                        m2.1-5.4
                                        a7.5 7.5 0 1 1-15 0
                                        a7.5 7.5 0 0 1 15 0Z
                                    "
                                />

                            </svg>


                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search conversations..."
                                className="
                                    w-full
                                    h-10
                                    pl-9
                                    pr-4
                                    rounded-xl
                                    bg-gray-50
                                    border
                                    border-gray-200
                                    text-sm
                                    text-gray-900
                                    placeholder:text-gray-400
                                    outline-none
                                    transition
                                    focus:bg-white
                                    focus:border-blue-400
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                    )}

                </div>


                {/* =================================================
                    CHAT LIST
                ================================================= */}

                <div className="overflow-y-auto">

                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loading && chats.length === 0 && (

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                py-16
                                px-6
                            "
                        >

                            <div
                                className="
                                    w-8
                                    h-8
                                    border-2
                                    border-blue-600
                                    border-t-transparent
                                    rounded-full
                                    animate-spin
                                "
                            />

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    mt-4
                                "
                            >
                                Loading conversations...
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        NO CONVERSATIONS
                    ================================================= */}

                    {!loading && chats.length === 0 && (

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                                py-16
                                px-8
                            "
                        >

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-blue-50
                                    text-blue-600
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="
                                            M8 10h8
                                            M8 14h5
                                            m7-2
                                            a8 8 0 0 1-8 8
                                            a8.5 8.5 0 0 1-4-.99
                                            L4 20l.99-4
                                            A8.5 8.5 0 0 1 4 12
                                            a8 8 0 1 1 16 0Z
                                        "
                                    />

                                </svg>

                            </div>


                            <h3
                                className="
                                    font-semibold
                                    text-gray-900
                                    mt-5
                                "
                            >
                                No conversations yet
                            </h3>


                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    mt-2
                                    max-w-xs
                                "
                            >
                                Start a conversation with one of your
                                connections.
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        SEARCH EMPTY
                    ================================================= */}

                    {!loading &&
                        chats.length > 0 &&
                        filteredChats.length === 0 && (

                            <div
                                className="
                                    text-center
                                    py-12
                                    px-6
                                "
                            >

                                <div
                                    className="
                                        w-12
                                        h-12
                                        mx-auto
                                        rounded-full
                                        bg-gray-100
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="
                                                m21 21-4.35-4.35
                                                m2.1-5.4
                                                a7.5 7.5 0 1 1-15 0
                                                a7.5 7.5 0 0 1 15 0Z
                                            "
                                        />

                                    </svg>

                                </div>


                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        mt-3
                                    "
                                >
                                    No conversations found
                                </p>


                                <p
                                    className="
                                        text-xs
                                        text-gray-400
                                        mt-1
                                    "
                                >
                                    Try searching another name.
                                </p>

                            </div>

                        )}


                    {/* =================================================
                        CONVERSATIONS
                    ================================================= */}

                    {filteredChats.map((chat) => {

                        const otherUser =
                            getOtherParticipant(chat);

                        if (!otherUser) {
                            return null;
                        }

                        return (

                            <ChatListItem
                                key={chat._id}
                                chat={chat}
                                otherUser={otherUser}
                                onClick={() =>
                                    handleSelectChat(chat)
                                }
                            />

                        );

                    })}

                </div>

            </div>

        </div>

    );
};


/* =========================================================
   CHAT LIST ITEM
========================================================= */

const ChatListItem = ({
    chat,
    otherUser,
    onClick,
}) => {

    const isOnline = useSelector(
        selectIsUserOnline(otherUser._id)
    );


    return (

        <button
            onClick={onClick}
            className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-3.5
                text-left
                border-b
                border-gray-100
                transition
                hover:bg-gray-50
                active:bg-gray-100
                cursor-pointer
            "
        >

            {/* =================================================
                PROFILE IMAGE
            ================================================= */}

            <div className="relative shrink-0">

                {otherUser?.profileImage ? (

                    <img
                        src={otherUser.profileImage}
                        alt={otherUser.name}
                        className="
                            w-12
                            h-12
                            rounded-full
                            object-cover
                            border
                            border-gray-200
                            bg-gray-100
                        "
                    />

                ) : (

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            border
                            border-gray-200
                            bg-gray-200
                            flex
                            items-center
                            justify-center
                            text-lg
                            font-semibold
                            text-gray-600
                            select-none
                        "
                    >
                        {otherUser?.name
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                    </div>

                )}


                {/* ONLINE BADGE */}

                {isOnline && (
                    <OnlineBadge />
                )}

            </div>


            {/* =================================================
                USER INFORMATION
            ================================================= */}

            <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">

                    <p
                        className="
                            font-semibold
                            text-gray-900
                            truncate
                            text-[15px]
                        "
                    >
                        {otherUser.name}
                    </p>


                    {isOnline && (

                        <span
                            className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-green-500
                                shrink-0
                            "
                        />

                    )}

                </div>


                <p
                    className="
                        text-xs
                        text-gray-500
                        truncate
                        mt-1
                    "
                >
                    {isOnline
                        ? "Active now"
                        : "Offline"
                    }
                </p>

            </div>

        </button>

    );
};


export default Chat;