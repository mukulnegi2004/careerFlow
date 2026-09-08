import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaMagic,
} from "react-icons/fa";

import {
    selectIsUserOnline,
} from "../../features/chat/chatSelectors";

import {
    selectUser,
} from "../../features/auth/authSelectors";

import OnlineBadge from "./OnlineBadge";


const ChatHeader = ({ chat }) => {

    const navigate = useNavigate();

    const currentUser = useSelector(selectUser);


    const otherUser =
        chat?.participants?.find(
            (p) =>
                String(p._id) !==
                String(currentUser?._id)
        );


    const isOnline = useSelector(
        selectIsUserOnline(otherUser?._id)
    );


    if (!otherUser) {
        return null;
    }


    // =========================================================
    // PROFILE
    // =========================================================

    const handleProfileClick = () => {

        navigate(
            `/users/${otherUser._id}`
        );

    };


    // =========================================================
    // BACK
    // =========================================================

    const handleBack = () => {

        navigate("/chat");

    };


    // =========================================================
    // AI
    // =========================================================

    const handleAISuggestions = () => {

        navigate(
            `/ai/reply/${chat._id}`
        );

    };


    return (

        <header
            className="
                flex
                h-[64px]
                shrink-0
                items-center

                gap-1.5

                border-b
                border-slate-200

                bg-white

                px-2.5

                sm:h-[72px]
                sm:gap-2
                sm:px-4

                dark:border-slate-800
                dark:bg-slate-900

                transition-colors
                duration-300
            "
        >

            {/* =================================================
                BACK
            ================================================= */}

            <button
                onClick={handleBack}
                aria-label="Back to conversations"
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    text-slate-500

                    transition-all
                    duration-200

                    hover:bg-slate-100
                    hover:text-slate-900

                    active:scale-95

                    dark:text-slate-400
                    dark:hover:bg-slate-800
                    dark:hover:text-white
                "
            >

                <FaArrowLeft className="text-sm" />

            </button>


            {/* =================================================
                USER
            ================================================= */}

            <button
                onClick={handleProfileClick}
                className="
                    cursor-pointer
                    group
                    flex
                    min-w-0
                    flex-1
                    items-center
                    gap-2.5

                    rounded-xl

                    px-1.5
                    py-1.5

                    text-left

                    transition-colors
                    duration-200

                    hover:bg-slate-50
                    active:bg-slate-100

                    dark:hover:bg-slate-800
                    dark:active:bg-slate-700
                "
            >

                {/* =================================================
                    AVATAR
                ================================================= */}

                <div
                    className="
                        relative
                        shrink-0
                    "
                >

                    {otherUser.profileImage ? (

                        <img
                            src={otherUser.profileImage}
                            alt={otherUser.name}
                            className="
                                h-10
                                w-10
                                rounded-full

                                border-2
                                border-slate-100

                                bg-slate-100

                                object-cover

                                shadow-sm

                                sm:h-11
                                sm:w-11

                                dark:border-slate-700
                                dark:bg-slate-800
                            "
                        />

                    ) : (

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center

                                rounded-full

                                bg-gradient-to-br
                                from-blue-500
                                to-indigo-600

                                text-sm
                                font-bold
                                text-white

                                shadow-md

                                sm:h-11
                                sm:w-11
                                sm:text-base
                            "
                        >
                            {otherUser.name
                                ?.charAt(0)
                                .toUpperCase() || "U"}
                        </div>

                    )}


                    {isOnline && (
                        <OnlineBadge />
                    )}

                </div>


                {/* =================================================
                    USER INFORMATION
                ================================================= */}

                <div className="min-w-0">

                    <p
                        className="
                            truncate

                            text-sm
                            font-bold

                            text-slate-900

                            transition-colors
                            duration-200

                            group-hover:text-blue-600

                            sm:text-[15px]

                            dark:text-white
                            dark:group-hover:text-blue-400
                        "
                    >
                        {otherUser.name}
                    </p>


                    <div
                        className="
                            mt-0.5
                            flex
                            items-center
                            gap-1.5
                        "
                    >

                        <span
                            className={`
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full

                                ${
                                    isOnline
                                        ? "bg-emerald-500"
                                        : "bg-slate-400 dark:bg-slate-600"
                                }
                            `}
                        />

                        <p
                            className={`
                                truncate
                                text-[11px]
                                font-medium

                                sm:text-xs

                                ${
                                    isOnline
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-slate-400 dark:text-slate-500"
                                }
                            `}
                        >
                            {isOnline
                                ? "Active now"
                                : "Offline"
                            }
                        </p>

                    </div>

                </div>

            </button>


            {/* =================================================
                AI REPLY SUGGESTIONS
            ================================================= */}

            <button
                onClick={handleAISuggestions}
                aria-label="AI reply suggestions"
                title="AI reply suggestions"
                className="
                    cursor-pointer
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    text-slate-400

                    transition-all
                    duration-200

                    hover:bg-purple-50
                    hover:text-purple-600

                    active:scale-95

                    dark:text-slate-500
                    dark:hover:bg-purple-950/40
                    dark:hover:text-purple-400
                "
            >

                <FaMagic className="text-base" />

            </button>

        </header>

    );

};


export default ChatHeader;