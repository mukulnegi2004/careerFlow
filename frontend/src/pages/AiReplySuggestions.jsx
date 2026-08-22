import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchReplySuggestions } from "../features/ai/aiAPI";

import {
    clearReplySuggestions
} from "../features/ai/aiSlice";

import {
    selectReplySuggestions,
    selectAILoading,
    selectAIError
} from "../features/ai/aiSelectors";


const AiReplySuggestions = () => {

    const { chatId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // =========================================================
    // REDUX STATE
    // =========================================================

    const suggestions = useSelector(
        selectReplySuggestions
    ) || [];

    const loading = useSelector(
        selectAILoading
    );

    const error = useSelector(
        selectAIError
    );


    // =========================================================
    // FETCH SUGGESTIONS WHEN PAGE OPENS
    // =========================================================

    useEffect(() => {

        if (!chatId) return;

        dispatch(clearReplySuggestions());

        dispatch(
            fetchReplySuggestions(chatId)
        );

    }, [chatId, dispatch]);


    // =========================================================
    // GENERATE NEW SUGGESTIONS
    // =========================================================

    const handleNewSuggestions = () => {

        if (!chatId || loading) return;

        // Remove old suggestions
        dispatch(clearReplySuggestions());

        // Generate fresh suggestions
        dispatch(
            fetchReplySuggestions(chatId)
        );

    };


    // =========================================================
    // RETRY
    // =========================================================

    const handleRetry = () => {

        if (!chatId || loading) return;

        dispatch(clearReplySuggestions());

        dispatch(
            fetchReplySuggestions(chatId)
        );

    };


    // =========================================================
    // BACK TO CHAT
    // =========================================================

    const handleBack = () => {

        if (!chatId) return;

        navigate(`/chat/${chatId}`);

    };


    // =========================================================
    // SELECT SUGGESTION
    // =========================================================

    const handleSuggestionClick = (text) => {

        if (!chatId || !text) return;

        navigate(
            `/chat/${chatId}`,
            {
                state: {
                    suggestedMessage: text
                }
            }
        );

    };


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

            <header
                className="
                    h-[72px]
                    shrink-0
                    flex
                    items-center
                    gap-3
                    px-4
                    sm:px-5
                    bg-white
                    border-b
                    border-gray-200
                "
            >

                {/* BACK */}

                <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Back to chat"
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


                {/* TITLE */}

                <div className="min-w-0">

                    <h1
                        className="
                            text-base
                            sm:text-lg
                            font-semibold
                            text-gray-900
                        "
                    >
                        AI Reply Suggestions
                    </h1>

                    <p
                        className="
                            text-xs
                            text-gray-500
                        "
                    >
                        Choose a reply for this conversation
                    </p>

                </div>

            </header>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    bg-gray-50
                    p-4
                    sm:p-6
                "
            >

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

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
                                    w-10
                                    h-10
                                    mx-auto
                                    border-4
                                    border-purple-200
                                    border-t-purple-600
                                    rounded-full
                                    animate-spin
                                "
                            />

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Generating suggestions...
                            </p>

                        </div>

                    </div>

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading && error && (

                    <div
                        className="
                            h-full
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <div className="text-center">

                            <p
                                className="
                                    text-sm
                                    text-red-500
                                "
                            >
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={handleRetry}
                                disabled={loading}
                                className="
                                    mt-4
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-purple-600
                                    text-white
                                    text-sm
                                    font-medium
                                    hover:bg-purple-700
                                    transition
                                    active:scale-95
                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                    cursor-pointer
                                "
                            >
                                Try Again
                            </button>

                        </div>

                    </div>

                )}


                {/* =================================================
                    SUGGESTIONS
                ================================================= */}

                {!loading &&
                    !error &&
                    suggestions.length > 0 && (

                    <div
                        className="
                            max-w-2xl
                            mx-auto
                        "
                    >

                        {/* DESCRIPTION */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-3
                                mb-4
                            "
                        >

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                Select a suggestion to use it
                                as your message.
                            </p>


                            {/* NEW SUGGESTIONS BUTTON */}

                            <button
                                type="button"
                                onClick={handleNewSuggestions}
                                disabled={loading}
                                className="
                                    shrink-0
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-2
                                    rounded-lg
                                    bg-purple-600
                                    text-white
                                    text-xs
                                    sm:text-sm
                                    font-medium
                                    hover:bg-purple-700
                                    transition
                                    active:scale-95
                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                    cursor-pointer
                                "
                            >

                                {/* Refresh icon */}

                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"
                                    />

                                </svg>

                                <span className="hidden sm:inline">
                                    New Suggestions
                                </span>

                                <span className="sm:hidden">
                                    New
                                </span>

                            </button>

                        </div>


                        {/* SUGGESTION CARDS */}

                        <div className="space-y-3">

                            {suggestions.map(
                                (suggestion, index) => (

                                <button
                                    key={
                                        suggestion._id || index
                                    }
                                    type="button"
                                    onClick={() =>
                                        handleSuggestionClick(
                                            suggestion.text
                                        )
                                    }
                                    className="
                                        w-full
                                        text-left
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-xl
                                        p-4
                                        hover:border-purple-400
                                        hover:bg-purple-50
                                        transition
                                        active:scale-[0.99]
                                        cursor-pointer
                                    "
                                >

                                    {/* TOP */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                            mb-2
                                        "
                                    >

                                        <span
                                            className="
                                                text-xs
                                                font-semibold
                                                text-purple-600
                                                bg-purple-50
                                                px-2
                                                py-1
                                                rounded-md
                                            "
                                        >
                                            {suggestion.tone}
                                        </span>


                                        <span
                                            className="
                                                text-xs
                                                text-gray-400
                                            "
                                        >
                                            Use reply →
                                        </span>

                                    </div>


                                    {/* MESSAGE */}

                                    <p
                                        className="
                                            text-sm
                                            text-gray-800
                                            leading-6
                                        "
                                    >
                                        {suggestion.text}
                                    </p>

                                </button>

                            ))}

                        </div>

                    </div>

                )}


                {/* =================================================
                    NO SUGGESTIONS
                ================================================= */}

                {!loading &&
                    !error &&
                    suggestions.length === 0 && (

                    <div
                        className="
                            h-full
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <div className="text-center">

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                "
                            >
                                No suggestions available.
                            </p>


                            <button
                                type="button"
                                onClick={handleNewSuggestions}
                                className="
                                    mt-4
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-purple-600
                                    text-white
                                    text-sm
                                    font-medium
                                    hover:bg-purple-700
                                    transition
                                    active:scale-95
                                    cursor-pointer
                                "
                            >
                                Generate Suggestions
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};


export default AiReplySuggestions;