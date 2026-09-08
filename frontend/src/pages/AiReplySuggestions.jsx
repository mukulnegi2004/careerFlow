import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaMagic,
    FaSyncAlt,
    FaArrowRight,
} from "react-icons/fa";

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

        dispatch(clearReplySuggestions());

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
                -mx-4
                -mt-4
                -mb-20
                w-[calc(100%+2rem)]
                h-[calc(100dvh-130px)]

                flex
                flex-col
                overflow-hidden

                bg-slate-50
                text-slate-900

                transition-colors
                duration-300

                dark:bg-slate-950
                dark:text-white

                sm:mx-0
                sm:mt-0
                sm:mb-0
                sm:w-full
                sm:h-[calc(100vh-100px)]

                md:rounded-3xl
                md:border
                md:border-slate-200
                md:bg-white
                md:shadow-sm

                md:dark:border-slate-800
                md:dark:bg-slate-900
            "
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <header
                className="
                    h-16
                    sm:h-[72px]
                    shrink-0

                    flex
                    items-center
                    gap-3

                    px-4
                    sm:px-5

                    border-b
                    border-slate-200

                    bg-white

                    transition-colors
                    duration-300

                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >

                {/* BACK BUTTON */}

                <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Back to chat"
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

                        cursor-pointer
                    "
                >
                    <FaArrowLeft className="text-sm" />
                </button>


                {/* AI ICON */}

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center

                        rounded-xl

                        bg-gradient-to-br
                        from-blue-600
                        to-indigo-600

                        text-white

                        shadow-lg
                        shadow-blue-500/20
                    "
                >
                    <FaMagic className="text-sm" />
                </div>


                {/* TITLE */}

                <div className="min-w-0 flex-1">

                    <h1
                        className="
                            truncate
                            text-base
                            sm:text-lg
                            font-bold
                            tracking-tight

                            text-slate-900

                            dark:text-white
                        "
                    >
                        AI Reply Suggestions
                    </h1>

                    <p
                        className="
                            truncate
                            text-xs
                            sm:text-sm

                            text-slate-500

                            dark:text-slate-400
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
                    min-h-0
                    flex-1
                    overflow-y-auto
                    overscroll-contain

                    bg-slate-50

                    p-4
                    sm:p-6

                    transition-colors
                    duration-300

                    dark:bg-slate-950
                "
            >

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                        "
                    >

                        <div className="text-center">

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center

                                    rounded-2xl

                                    bg-blue-50

                                    dark:bg-blue-950/40
                                "
                            >

                                <FaMagic
                                    className="
                                        animate-pulse
                                        text-xl
                                        text-blue-600

                                        dark:text-blue-400
                                    "
                                />

                            </div>


                            <div
                                className="
                                    mx-auto
                                    mt-4
                                    h-1.5
                                    w-20
                                    overflow-hidden
                                    rounded-full
                                    bg-slate-200

                                    dark:bg-slate-800
                                "
                            >

                                <div
                                    className="
                                        h-full
                                        w-1/2
                                        animate-pulse
                                        rounded-full
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-indigo-600
                                    "
                                />

                            </div>


                            <p
                                className="
                                    mt-3
                                    text-sm
                                    font-medium

                                    text-slate-600

                                    dark:text-slate-300
                                "
                            >
                                Generating suggestions...
                            </p>


                            <p
                                className="
                                    mt-1
                                    text-xs

                                    text-slate-400

                                    dark:text-slate-500
                                "
                            >
                                AI is analyzing your conversation
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
                            flex
                            h-full
                            items-center
                            justify-center
                        "
                    >

                        <div
                            className="
                                w-full
                                max-w-md
                                rounded-3xl
                                border
                                border-red-200
                                bg-white
                                p-7
                                text-center
                                shadow-sm

                                dark:border-red-900/50
                                dark:bg-slate-900
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center

                                    rounded-2xl

                                    bg-red-50
                                    text-red-500

                                    dark:bg-red-950/40
                                    dark:text-red-400
                                "
                            >
                                <FaMagic />
                            </div>


                            <h2
                                className="
                                    mt-4
                                    text-lg
                                    font-bold

                                    text-slate-900

                                    dark:text-white
                                "
                            >
                                Couldn't generate suggestions
                            </h2>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6

                                    text-slate-500

                                    dark:text-slate-400
                                "
                            >
                                {error}
                            </p>


                            <button
                                type="button"
                                onClick={handleRetry}
                                disabled={loading}
                                className="
                                    mt-5
                                    inline-flex
                                    items-center
                                    gap-2

                                    rounded-xl

                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600

                                    px-5
                                    py-2.5

                                    text-sm
                                    font-semibold
                                    text-white

                                    shadow-md
                                    shadow-blue-500/20

                                    transition-all
                                    duration-200

                                    hover:-translate-y-0.5
                                    hover:shadow-lg

                                    active:translate-y-0

                                    disabled:cursor-not-allowed
                                    disabled:opacity-50

                                    cursor-pointer
                                "
                            >
                                <FaSyncAlt />
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
                            mx-auto
                            w-full
                            max-w-2xl
                        "
                    >

                        {/* TOP SECTION */}

                        <div
                            className="
                                mb-5
                                flex
                                flex-col
                                gap-4

                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div>

                                <div className="flex items-center gap-2">

                                    <FaMagic
                                        className="
                                            text-sm
                                            text-blue-600

                                            dark:text-blue-400
                                        "
                                    />


                                    <h2
                                        className="
                                            text-sm
                                            font-bold
                                            uppercase
                                            tracking-wider

                                            text-slate-700

                                            dark:text-slate-200
                                        "
                                    >
                                        Suggested Replies
                                    </h2>


                                    <span
                                        className="
                                            rounded-full
                                            bg-blue-50

                                            px-2.5
                                            py-1

                                            text-[11px]
                                            font-semibold

                                            text-blue-600

                                            dark:bg-blue-950/50
                                            dark:text-blue-400
                                        "
                                    >
                                        {suggestions.length}
                                    </span>

                                </div>


                                <p
                                    className="
                                        mt-1.5
                                        text-xs
                                        leading-5

                                        text-slate-500

                                        dark:text-slate-400
                                    "
                                >
                                    Select a suggestion to use it as your message.
                                </p>

                            </div>


                            {/* NEW SUGGESTIONS */}

                            <button
                                type="button"
                                onClick={handleNewSuggestions}
                                disabled={loading}
                                className="
                                    inline-flex
                                    w-fit
                                    shrink-0
                                    items-center
                                    justify-center
                                    gap-2

                                    rounded-xl

                                    border
                                    border-blue-200

                                    bg-blue-50

                                    px-3.5
                                    py-2.5

                                    text-xs
                                    sm:text-sm
                                    font-semibold

                                    text-blue-600

                                    transition-all
                                    duration-200

                                    hover:border-blue-300
                                    hover:bg-blue-100

                                    active:scale-95

                                    disabled:cursor-not-allowed
                                    disabled:opacity-50

                                    dark:border-blue-900
                                    dark:bg-blue-950/40
                                    dark:text-blue-400
                                    dark:hover:bg-blue-950/70

                                    cursor-pointer
                                "
                            >

                                <FaSyncAlt
                                    className={
                                        loading
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

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
                                        group
                                        w-full
                                        text-left

                                        rounded-2xl
                                        border
                                        border-slate-200

                                        bg-white

                                        p-4
                                        sm:p-5

                                        shadow-sm

                                        transition-all
                                        duration-300

                                        hover:-translate-y-0.5
                                        hover:border-blue-200
                                        hover:shadow-lg
                                        hover:shadow-blue-500/10

                                        active:translate-y-0

                                        dark:border-slate-800
                                        dark:bg-slate-900

                                        dark:hover:border-blue-900
                                        dark:hover:shadow-black/20

                                        cursor-pointer
                                    "
                                >

                                    {/* CARD TOP */}

                                    <div
                                        className="
                                            mb-3
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        "
                                    >

                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5

                                                rounded-lg

                                                bg-blue-50

                                                px-2.5
                                                py-1

                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-wide

                                                text-blue-600

                                                dark:bg-blue-950/50
                                                dark:text-blue-400
                                            "
                                        >

                                            <FaMagic className="text-[9px]" />

                                            {suggestion.tone}

                                        </span>


                                        <span
                                            className="
                                                flex
                                                items-center
                                                gap-1.5

                                                text-[11px]
                                                font-medium

                                                text-slate-400

                                                transition-colors

                                                group-hover:text-blue-600

                                                dark:text-slate-500
                                                dark:group-hover:text-blue-400
                                            "
                                        >

                                            Use reply

                                            <FaArrowRight
                                                className="
                                                    text-[9px]

                                                    transition-transform
                                                    duration-200

                                                    group-hover:translate-x-0.5
                                                "
                                            />

                                        </span>

                                    </div>


                                    {/* MESSAGE */}

                                    <p
                                        className="
                                            text-sm
                                            leading-6

                                            text-slate-700

                                            transition-colors

                                            group-hover:text-slate-900

                                            dark:text-slate-200
                                            dark:group-hover:text-white
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
                            flex
                            h-full
                            items-center
                            justify-center
                        "
                    >

                        <div
                            className="
                                w-full
                                max-w-md
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-8
                                text-center
                                shadow-sm

                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center

                                    rounded-2xl

                                    bg-blue-50

                                    text-blue-600

                                    dark:bg-blue-950/40
                                    dark:text-blue-400
                                "
                            >
                                <FaMagic className="text-xl" />
                            </div>


                            <h2
                                className="
                                    mt-4
                                    text-lg
                                    font-bold

                                    text-slate-900

                                    dark:text-white
                                "
                            >
                                No suggestions yet
                            </h2>


                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-sm
                                    text-sm
                                    leading-6

                                    text-slate-500

                                    dark:text-slate-400
                                "
                            >
                                Generate AI-powered replies based on your
                                conversation.
                            </p>


                            <button
                                type="button"
                                onClick={handleNewSuggestions}
                                className="
                                    mt-5
                                    inline-flex
                                    items-center
                                    gap-2

                                    rounded-xl

                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600

                                    px-5
                                    py-2.5

                                    text-sm
                                    font-semibold
                                    text-white

                                    shadow-md
                                    shadow-blue-500/20

                                    transition-all
                                    duration-200

                                    hover:-translate-y-0.5
                                    hover:shadow-lg

                                    active:translate-y-0

                                    cursor-pointer
                                "
                            >
                                <FaMagic />
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