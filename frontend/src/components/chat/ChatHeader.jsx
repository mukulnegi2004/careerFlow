import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    const otherUser = chat?.participants?.find(
        (p) => String(p._id) !== String(currentUser?._id)
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
        navigate(`/users/${otherUser._id}`);
    };


    // =========================================================
    // BACK
    // =========================================================

    const handleBack = () => {
        navigate("/chat");
    };

    const handleAISuggestions = () => {
        navigate(`/ai/reply/${chat._id}`);
    };


    return (
        <header
            className="
                h-[72px]
                shrink-0
                flex
                items-center
                gap-2
                px-3
                sm:px-5
                bg-white
                border-b
                border-gray-200
            "
        >

            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <button
                onClick={handleBack}
                aria-label="Back to conversations"
                className="
                    w-9
                    h-9
                    shrink-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-gray-500
                    hover:text-gray-900
                    hover:bg-gray-100
                    transition
                    active:scale-95
                    cursor-pointer
                "
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>


            {/* =================================================
                USER
            ================================================= */}

            <button
                onClick={handleProfileClick}
                className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                    flex-1
                    text-left
                    rounded-xl
                    px-2
                    py-1.5
                    transition
                    hover:bg-gray-50
                    active:bg-gray-100
                    group
                    cursor-pointer
                "
            >

                {/* =================================================
                    AVATAR
                ================================================= */}

                <div className="relative shrink-0">

                    {otherUser?.profileImage ? (

                        <img
                            src={otherUser.profileImage}
                            alt={otherUser.name}
                            className="
                                w-11
                                h-11
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
                                w-11
                                h-11
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

                <div className="min-w-0">

                    <p
                        className="
                            font-semibold
                            text-gray-900
                            text-sm
                            sm:text-[15px]
                            truncate
                            group-hover:text-blue-600
                            transition
                        "
                    >
                        {otherUser.name}
                    </p>


                    <div
                        className="
                            flex
                            items-center
                            gap-1.5
                            mt-0.5
                        "
                    >

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

                        <p
                            className="
                                text-xs
                                text-gray-500
                                truncate
                            "
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
        w-9
        h-9
        shrink-0
        rounded-full
        flex
        items-center
        justify-center
        text-gray-400
        hover:text-purple-600
        hover:bg-purple-50
        transition
        active:scale-95
        cursor-pointer
    "
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
                    />

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"
                    />
                </svg>
            </button>

        </header>
    );
};

export default ChatHeader;