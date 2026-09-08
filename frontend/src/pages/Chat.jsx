import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaComments, FaArrowRight, FaCircle } from "react-icons/fa";

import { selectUser } from "../features/auth/authSelectors";

import { fetchChats } from "../features/chat/chatAPI";
import {
    selectChats,
    selectChatLoading,
    selectIsUserOnline,
} from "../features/chat/chatSelectors";

import OnlineBadge from "../components/chat/OnlineBadge";
import Loader from "../components/common/Loader";

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chats = useSelector(selectChats);
    const loading = useSelector(selectChatLoading);
    const currentUser = useSelector(selectUser);

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const getOtherParticipant = (chat) => {
        return chat.participants?.find(
            (participant) =>
                String(participant._id) !== String(currentUser?._id)
        );
    };

    const filteredChats = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return chats;
        }

        return chats.filter((chat) => {
            const otherUser = getOtherParticipant(chat);

            return otherUser?.name?.toLowerCase().includes(query);
        });
    }, [chats, search, currentUser]);

    const handleSelectChat = (chat) => {
        navigate(`/chat/${chat._id}`);
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">

            {/* ================= HEADER ================= */}

            <div className="mb-6">
                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg text-white shadow-lg shadow-blue-500/20">
                        <FaComments />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Messages
                        </h1>

                        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                            Connect and chat with your network
                        </p>
                    </div>

                </div>
            </div>


            {/* ================= SEARCH BOX ================= */}

            {chats.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6">

                    <label
                        htmlFor="chat-search"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                        Search conversations
                    </label>

                    <div className="relative">

                        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500" />

                        <input
                            id="chat-search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name..."
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                py-3.5
                                pl-11
                                pr-4
                                text-sm
                                text-slate-900
                                outline-none
                                transition-all
                                duration-200
                                placeholder:text-slate-400
                                focus:border-blue-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-blue-500/10
                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:text-white
                                dark:placeholder:text-slate-500
                                dark:focus:border-blue-500
                                dark:focus:bg-slate-800
                            "
                        />

                    </div>

                    {search.trim() && (
                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                            Showing conversations for{" "}
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                "{search.trim()}"
                            </span>
                        </p>
                    )}

                </div>
            )}


            {/* ================= SECTION HEADER ================= */}

            {!loading && chats.length > 0 && (
                <div className="mb-3 mt-7 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <FaComments className="text-sm text-blue-600 dark:text-blue-400" />

                        <h2 className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-700
                            dark:text-slate-200
                        ">
                            {search.trim()
                                ? "Search Results"
                                : "Your Conversations"}
                        </h2>

                    </div>

                    <span className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-500
                        dark:bg-slate-800
                        dark:text-slate-400
                    ">
                        {filteredChats.length}
                    </span>

                </div>
            )}


            {/* ================= LOADING ================= */}

            {loading && chats.length === 0 && (
                <div className="
                    flex
                    justify-center
                    py-10
                ">
                    <Loader />
                </div>
            )}


            {/* ================= CONVERSATIONS ================= */}

            <div className="space-y-3">

                {filteredChats.map((chat) => {

                    const otherUser = getOtherParticipant(chat);

                    if (!otherUser) {
                        return null;
                    }

                    return (
                        <ChatListItem
                            key={chat._id}
                            chat={chat}
                            otherUser={otherUser}
                            onClick={() => handleSelectChat(chat)}
                        />
                    );
                })}

            </div>


            {/* ================= NO CONVERSATIONS ================= */}

            {!loading &&
                chats.length === 0 && (

                    <div className="
                        mt-4
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-10
                        text-center
                        shadow-sm
                        dark:border-slate-800
                        dark:bg-slate-900
                    ">

                        <div className="
                            mx-auto
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-50
                            text-xl
                            text-blue-600
                            dark:bg-blue-950/50
                            dark:text-blue-400
                        ">
                            <FaComments />
                        </div>

                        <h3 className="
                            text-lg
                            font-bold
                            text-slate-800
                            dark:text-white
                        ">
                            No conversations yet
                        </h3>

                        <p className="
                            mx-auto
                            mt-1
                            max-w-sm
                            text-sm
                            leading-6
                            text-slate-500
                            dark:text-slate-400
                        ">
                            Start a conversation with one of your connections
                            and your messages will appear here.
                        </p>

                    </div>
                )}


            {/* ================= SEARCH EMPTY ================= */}

            {!loading &&
                chats.length > 0 &&
                filteredChats.length === 0 && (

                    <div className="
                        mt-4
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-10
                        text-center
                        shadow-sm
                        dark:border-slate-800
                        dark:bg-slate-900
                    ">

                        <div className="
                            mx-auto
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-100
                            text-xl
                            text-slate-400
                            dark:bg-slate-800
                            dark:text-slate-500
                        ">
                            <FaSearch />
                        </div>

                        <h3 className="
                            text-lg
                            font-bold
                            text-slate-800
                            dark:text-white
                        ">
                            No conversations found
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        ">
                            No conversations found for "{search.trim()}"
                        </p>

                    </div>
                )}

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
                group
                block
                w-full
                cursor-pointer
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-left
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:shadow-lg
                hover:shadow-slate-200/50
                active:translate-y-0
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-blue-900
                dark:hover:shadow-black/20
            "
        >

            <div className="flex items-center gap-4">

                {/* ================= PROFILE IMAGE ================= */}

                <div className="relative shrink-0">

                    {otherUser?.profileImage ? (

                        <img
                            src={otherUser.profileImage}
                            alt={otherUser.name}
                            className="
                                h-14
                                w-14
                                rounded-full
                                border-2
                                border-slate-100
                                bg-slate-100
                                object-cover
                                shadow-sm
                                transition-transform
                                duration-300
                                group-hover:scale-105
                                dark:border-slate-700
                                dark:bg-slate-800
                            "
                        />

                    ) : (

                        <div className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-blue-500
                            to-indigo-600
                            text-xl
                            font-bold
                            text-white
                            shadow-md
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        ">
                            {otherUser?.name
                                ?.charAt(0)
                                .toUpperCase() || "U"}
                        </div>

                    )}

                    {isOnline && <OnlineBadge />}

                </div>


                {/* ================= USER INFO ================= */}

                <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2">

                        <h2 className="
                            truncate
                            font-semibold
                            text-slate-900
                            transition-colors
                            duration-200
                            group-hover:text-blue-600
                            dark:text-white
                            dark:group-hover:text-blue-400
                        ">
                            {otherUser.name}
                        </h2>

                        {isOnline && (
                            <FaCircle className="
                                shrink-0
                                text-[7px]
                                text-emerald-500
                            " />
                        )}

                    </div>


                    <div className="mt-1 flex items-center gap-2">

                        <span className={`
                            text-sm
                            font-medium
                            ${
                                isOnline
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-slate-500 dark:text-slate-400"
                            }
                        `}>
                            {isOnline
                                ? "Active now"
                                : "Offline"}
                        </span>

                    </div>

                </div>


                {/* ================= ARROW ================= */}

                <div className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-50
                    text-slate-400
                    transition-all
                    duration-300
                    group-hover:bg-blue-50
                    group-hover:text-blue-600
                    dark:bg-slate-800
                    dark:text-slate-500
                    dark:group-hover:bg-blue-950/50
                    dark:group-hover:text-blue-400
                ">
                    <FaArrowRight className="
                        text-sm
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                    " />
                </div>

            </div>

        </button>
    );
};


export default Chat;