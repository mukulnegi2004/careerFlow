import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchJobSuggestions,
    fetchCareerChat,
} from "../features/ai/aiAPI";

import {
    selectJobSuggestions,
    selectAILoading,
    selectAIError,
} from "../features/ai/aiSelectors";

import {
    clearJobSuggestions,
    clearAIError,
} from "../features/ai/aiSlice";

function Ai() {
    const dispatch = useDispatch();

    const jobSuggestions = useSelector(selectJobSuggestions);
    const loading = useSelector(selectAILoading);
    const error = useSelector(selectAIError);

    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    // ============================================
    // LOAD JOB SUGGESTIONS
    // ============================================

    useEffect(() => {
        if (jobSuggestions.length === 0) {
            dispatch(fetchJobSuggestions());
        }

        return () => {
            dispatch(clearAIError());
        };
    }, [dispatch, jobSuggestions.length]);

    // ============================================
    // NEW JOB SUGGESTIONS
    // ============================================

    const handleNewSuggestions = () => {
        dispatch(clearJobSuggestions());
        dispatch(fetchJobSuggestions());
    };

    // ============================================
    // SEND MESSAGE
    // ============================================

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) return;

        try {
            const reply = await dispatch(
                fetchCareerChat(trimmedMessage)
            ).unwrap();

            setChatMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    userMessage: trimmedMessage,
                    reply,
                },
            ]);

            setMessage("");
        } catch (error) {
            console.error("Career chat error:", error);
        }
    };

    // ============================================
    // TRY ANOTHER RESPONSE
    // ============================================

    const handleTryAnother = async (userMessage) => {
        if (loading) return;

        try {
            const reply = await dispatch(
                fetchCareerChat(userMessage)
            ).unwrap();

            setChatMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    userMessage,
                    reply,
                },
            ]);
        } catch (error) {
            console.error("Career chat error:", error);
        }
    };

    // ============================================
    // ENTER KEY
    // ============================================

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // ============================================
    // FORMAT BOLD TEXT
    // Backend uses **text**
    // ============================================

    const formatBoldText = (text) => {
        if (!text) return null;

        const parts = text.split(/(\*\*.*?\*\*)/g);

        return parts.map((part, index) => {
            if (
                part.startsWith("**") &&
                part.endsWith("**")
            ) {
                return (
                    <strong
                        key={index}
                        className="font-semibold text-gray-900"
                    >
                        {part.slice(2, -2)}
                    </strong>
                );
            }

            return part;
        });
    };

    // ============================================
    // FORMAT AI RESPONSE
    //
    // Supports:
    // - bullets
    // * bullets
    // 1. numbered lists
    // **bold text**
    // normal paragraphs
    // ============================================

    const formatAIResponse = (text) => {
        if (!text) return null;

        const lines = text.split("\n");

        return lines.map((line, index) => {
            const trimmed = line.trim();

            // Empty line
            if (!trimmed) {
                return (
                    <div
                        key={index}
                        className="h-2"
                    />
                );
            }

            // ========================================
            // BULLET POINT
            // ========================================

            if (
                trimmed.startsWith("- ") ||
                trimmed.startsWith("* ")
            ) {
                const content = trimmed.substring(2);

                return (
                    <div
                        key={index}
                        className="mb-2 flex gap-2 text-sm leading-6 text-gray-700"
                    >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />

                        <span>
                            {formatBoldText(content)}
                        </span>
                    </div>
                );
            }

            // ========================================
            // NUMBERED LIST
            // ========================================

            if (/^\d+\.\s/.test(trimmed)) {
                const match = trimmed.match(
                    /^(\d+)\.\s(.*)$/
                );

                return (
                    <div
                        key={index}
                        className="mb-3 flex gap-3 text-sm leading-6 text-gray-700"
                    >
                        <span className="min-w-[20px] font-semibold text-blue-600">
                            {match[1]}.
                        </span>

                        <span>
                            {formatBoldText(match[2])}
                        </span>
                    </div>
                );
            }

            // ========================================
            // NORMAL TEXT
            // ========================================

            return (
                <p
                    key={index}
                    className="mb-2 text-sm leading-7 text-gray-700"
                >
                    {formatBoldText(trimmed)}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl">

                {/* ============================================
                    PAGE HEADER
                ============================================ */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        AI Career Assistant
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Get personalized career suggestions and
                        professional guidance based on your profile.
                    </p>
                </div>

                {/* ============================================
                    JOB SUGGESTIONS
                ============================================ */}

                <section className="mb-10">

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Career Opportunities
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                AI-powered opportunities based on your profile.
                            </p>
                        </div>

                        <button
                            onClick={handleNewSuggestions}
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                            {loading
                                ? "Generating..."
                                : "Generate New Suggestions"}
                        </button>

                    </div>

                    {/* ERROR */}

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* LOADING SKELETON */}

                    {loading && jobSuggestions.length === 0 && (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="h-56 animate-pulse rounded-xl bg-gray-200"
                                />
                            ))}
                        </div>
                    )}

                    {/* JOB CARDS */}

                    {jobSuggestions.length > 0 && (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {jobSuggestions.map((job, index) => (
                                <div
                                    key={`${job.jobTitle}-${index}`}
                                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >

                                    <div className="mb-4 flex items-start justify-between gap-3">

                                        <div>
                                            <span className="text-xs font-medium text-blue-600">
                                                Career Match
                                            </span>

                                            <h3 className="mt-1 text-lg font-semibold text-gray-900">
                                                {job.jobTitle}
                                            </h3>
                                        </div>

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-600">
                                            {job.matchPercentage}
                                        </div>

                                    </div>

                                    <p className="mb-4 text-sm leading-6 text-gray-600">
                                        {job.reason}
                                    </p>

                                    <div>
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Skills to improve
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {job.skillsToImprove?.map(
                                                (skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </section>

                {/* ============================================
                    CAREER CHAT
                ============================================ */}

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* CHAT HEADER */}

                    <div className="border-b border-gray-200 bg-gray-900 px-5 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl">
                                ✨
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    CareerFlow AI
                                </h2>

                                <p className="text-sm text-gray-400">
                                    Your career and professional assistant
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* CHAT AREA */}

                    <div className="max-h-[650px] min-h-[450px] overflow-y-auto bg-gray-50 p-4 md:p-6">

                        {/* EMPTY STATE */}

                        {chatMessages.length === 0 && (
                            <div className="flex min-h-[380px] items-center justify-center">

                                <div className="max-w-lg text-center">

                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                                        🤖
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900">
                                        How can I help with your career?
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Ask me about resumes, interviews,
                                        DSA, software engineering careers,
                                        job searching, skills, projects,
                                        networking, or professional profiles.
                                    </p>

                                </div>

                            </div>
                        )}

                        {/* CHAT MESSAGES */}

                        <div className="space-y-7">

                            {chatMessages.map((chat) => (
                                <div key={chat.id}>

                                    {/* ========================================
                                        USER MESSAGE
                                    ======================================== */}

                                    <div className="mb-4 flex justify-end">

                                        <div className="max-w-[85%] md:max-w-[70%]">

                                            <div className="rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-6 text-white">
                                                {chat.userMessage}
                                            </div>

                                        </div>

                                    </div>

                                    {/* ========================================
                                        AI MESSAGE
                                    ======================================== */}

                                    <div className="flex justify-start">

                                        <div className="w-full max-w-[95%] md:max-w-[85%]">

                                            <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-5 py-5 shadow-sm">

                                                {/* AI HEADER */}

                                                <div className="mb-4 flex items-center gap-2">

                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                                        ✨
                                                    </div>

                                                    <span className="text-sm font-semibold text-gray-800">
                                                        CareerFlow AI
                                                    </span>

                                                </div>

                                                {/* ====================================
                                                    OUT OF SCOPE
                                                ==================================== */}

                                                {chat.reply?.type === "out_of_scope" ? (

                                                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">

                                                        <p className="text-sm leading-6 text-yellow-800">
                                                            {chat.reply.message}
                                                        </p>

                                                    </div>

                                                ) : (

                                                    /* ====================================
                                                        AI ANSWER
                                                    ==================================== */

                                                    <div>
                                                        {formatAIResponse(
                                                            chat.reply?.message
                                                        )}
                                                    </div>
                                                )}

                                            </div>

                                            {/* TRY ANOTHER */}

                                            {chat.reply?.type === "answer" && (
                                                <button
                                                    onClick={() =>
                                                        handleTryAnother(
                                                            chat.userMessage
                                                        )
                                                    }
                                                    disabled={loading}
                                                    className="mt-2 cursor-pointer flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    ↻ Try another response
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            ))}

                            {/* ========================================
                                AI LOADING
                            ======================================== */}

                            {loading && (
                                <div className="flex justify-start">

                                    <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-5 py-4 shadow-sm">

                                        <div className="flex items-center gap-2">

                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                style={{
                                                    animationDelay: "0.15s",
                                                }}
                                            />

                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                style={{
                                                    animationDelay: "0.3s",
                                                }}
                                            />

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* ============================================
                        INPUT
                    ============================================ */}

                    <div className="border-t border-gray-200 bg-white p-4">

                        <div className="flex items-end gap-3">

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Ask something about your career..."
                                rows={2}
                                maxLength={1000}
                                className="max-h-32 min-h-[52px] flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                onClick={handleSendMessage}
                                disabled={!message.trim() || loading}
                                className="rounded-xl bg-blue-600 cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Send
                            </button>

                        </div>

                        <div className="mt-2 flex items-center justify-between">

                            <p className="text-xs text-gray-400">
                                Career-related questions only
                            </p>

                            <span className="text-xs text-gray-400">
                                {message.length}/1000
                            </span>

                        </div>

                    </div>

                </section>

            </div>
        </div>
    );
}

export default Ai;