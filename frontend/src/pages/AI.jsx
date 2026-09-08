import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaRobot,
    FaBriefcase,
    FaSyncAlt,
    FaPaperPlane,
    FaMagic,
    FaCheckCircle,
    FaLightbulb,
} from "react-icons/fa";

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
                        className="font-semibold text-slate-900 dark:text-white"
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

            // Bullet point
            if (
                trimmed.startsWith("- ") ||
                trimmed.startsWith("* ")
            ) {
                const content = trimmed.substring(2);

                return (
                    <div
                        key={index}
                        className="mb-2 flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                    >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />

                        <span>
                            {formatBoldText(content)}
                        </span>
                    </div>
                );
            }

            // Numbered list
            if (/^\d+\.\s/.test(trimmed)) {
                const match = trimmed.match(
                    /^(\d+)\.\s(.*)$/
                );

                return (
                    <div
                        key={index}
                        className="mb-3 flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                    >
                        <span className="min-w-[24px] font-semibold text-blue-600 dark:text-blue-400">
                            {match[1]}.
                        </span>

                        <span>
                            {formatBoldText(match[2])}
                        </span>
                    </div>
                );
            }

            // Normal paragraph
            return (
                <p
                    key={index}
                    className="mb-2 text-sm leading-7 text-slate-600 dark:text-slate-300"
                >
                    {formatBoldText(trimmed)}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 transition-colors duration-300 dark:bg-slate-950 sm:px-6 md:px-8">

            <div className="mx-auto max-w-6xl">

                {/* ============================================
                    PAGE HEADER
                ============================================ */}

                <div className="mb-8">
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-xl text-white shadow-lg shadow-blue-500/20">
                            <FaRobot />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                                AI Career Assistant
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Get personalized career suggestions and professional guidance based on your profile.
                            </p>
                        </div>

                    </div>
                </div>

                {/* ============================================
                    CAREER OPPORTUNITIES
                ============================================ */}

                <section className="mb-10">

                    {/* Section Header */}

                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <div className="mb-2 flex items-center gap-2">

                                <FaBriefcase className="text-blue-600 dark:text-blue-400" />

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                                    Career Opportunities
                                </h2>

                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                AI-powered opportunities based on your profile.
                            </p>
                        </div>

                        <button
                            onClick={handleNewSuggestions}
                            disabled={loading}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            <FaSyncAlt
                                className={
                                    loading ? "animate-spin" : ""
                                }
                            />

                            {loading
                                ? "Generating..."
                                : "Generate New Suggestions"}
                        </button>

                    </div>

                    {/* Error */}

                    {error && (
                        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Loading */}

                    {loading && jobSuggestions.length === 0 && (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="h-60 animate-pulse rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                                />
                            ))}

                        </div>
                    )}

                    {/* Job Cards */}

                    {jobSuggestions.length > 0 && (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {jobSuggestions.map((job, index) => (
                                <div
                                    key={`${job.jobTitle}-${index}`}
                                    className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
                                >

                                    {/* Job Header */}

                                    <div className="mb-5 flex items-start justify-between gap-3">

                                        <div className="min-w-0">

                                            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                                Career Match
                                            </span>

                                            <h3 className="mt-2 text-lg font-bold leading-6 text-slate-900 dark:text-white">
                                                {job.jobTitle}
                                            </h3>

                                        </div>

                                        {/* Match */}

                                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">

                                            <span className="text-sm font-bold">
                                                {job.matchPercentage}
                                            </span>

                                            <span className="text-[9px] font-semibold uppercase">
                                                Match
                                            </span>

                                        </div>

                                    </div>

                                    {/* Reason */}

                                    <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {job.reason}
                                    </p>

                                    {/* Skills */}

                                    <div>

                                        <div className="mb-2.5 flex items-center gap-2">

                                            <FaLightbulb className="text-xs text-amber-500" />

                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Skills to improve
                                            </p>

                                        </div>

                                        <div className="flex flex-wrap gap-2">

                                            {job.skillsToImprove?.map(
                                                (skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

                    {/* Chat Header */}

                    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-5 py-5 sm:px-6">

                        {/* Background decoration */}

                        <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative flex items-center gap-3">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg text-white shadow-lg shadow-blue-500/20">
                                <FaRobot />
                            </div>

                            <div>

                                <div className="flex items-center gap-2">

                                    <h2 className="text-lg font-bold text-white">
                                        CareerFlow AI
                                    </h2>

                                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                        AI
                                    </span>

                                </div>

                                <p className="mt-0.5 text-sm text-slate-400">
                                    Your career and professional assistant
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Chat Area */}

                    <div className="max-h-[650px] min-h-[450px] overflow-y-auto bg-slate-50 p-4 transition-colors duration-300 dark:bg-slate-950 md:p-6">

                        {/* Empty State */}

                        {chatMessages.length === 0 && (
                            <div className="flex min-h-[380px] items-center justify-center">

                                <div className="max-w-xl text-center">

                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                                        <FaMagic />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        How can I help with your career?
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Ask me about resumes, interviews, DSA,
                                        software engineering careers, job
                                        searching, skills, projects,
                                        networking, or professional profiles.
                                    </p>

                                    {/* Starter Questions */}

                                    <div className="mt-5 flex flex-wrap justify-center gap-2">

                                        {[
                                            "Resume improvement",
                                            "Interview preparation",
                                            "DSA roadmap",
                                            "Career advice",
                                        ].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() =>
                                                    setMessage(item)
                                                }
                                                className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                                            >
                                                {item}
                                            </button>
                                        ))}

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* Messages */}

                        <div className="space-y-7">

                            {chatMessages.map((chat) => (
                                <div key={chat.id}>

                                    {/* User Message */}

                                    <div className="mb-4 flex justify-end">

                                        <div className="max-w-[88%] sm:max-w-[75%] md:max-w-[70%]">

                                            <div className="rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm leading-6 text-white shadow-sm shadow-blue-500/20">
                                                {chat.userMessage}
                                            </div>

                                        </div>

                                    </div>

                                    {/* AI Message */}

                                    <div className="flex justify-start">

                                        <div className="w-full max-w-[98%] sm:max-w-[90%] md:max-w-[85%]">

                                            <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                                                {/* AI Header */}

                                                <div className="mb-4 flex items-center gap-2">

                                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-xs text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                                                        <FaRobot />
                                                    </div>

                                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                                        CareerFlow AI
                                                    </span>

                                                </div>

                                                {/* Out of Scope */}

                                                {chat.reply?.type ===
                                                "out_of_scope" ? (
                                                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">

                                                        <p className="text-sm leading-6 text-amber-800 dark:text-amber-300">
                                                            {chat.reply.message}
                                                        </p>

                                                    </div>
                                                ) : (
                                                    <div>
                                                        {formatAIResponse(
                                                            chat.reply?.message
                                                        )}
                                                    </div>
                                                )}

                                            </div>

                                            {/* Try Another */}

                                            {chat.reply?.type === "answer" && (
                                                <button
                                                    onClick={() =>
                                                        handleTryAnother(
                                                            chat.userMessage
                                                        )
                                                    }
                                                    disabled={loading}
                                                    className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                                                >
                                                    <FaSyncAlt />
                                                    Try another response
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            ))}

                            {/* AI Loading */}

                            {loading && (
                                <div className="flex justify-start">

                                    <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                                        <div className="flex items-center gap-1.5">

                                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" />

                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"
                                                style={{
                                                    animationDelay:
                                                        "0.15s",
                                                }}
                                            />

                                            <span
                                                className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"
                                                style={{
                                                    animationDelay:
                                                        "0.3s",
                                                }}
                                            />

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Input */}

                    <div className="border-t border-slate-200 bg-white p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

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
                                className="max-h-32 min-h-[52px] flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-800"
                            />

                            <button
                                onClick={handleSendMessage}
                                disabled={!message.trim() || loading}
                                className="flex h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                <FaPaperPlane />

                                <span className="hidden sm:inline">
                                    Send
                                </span>
                            </button>

                        </div>

                        <div className="mt-2 flex items-center justify-between">

                            <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                                <FaCheckCircle className="text-[10px] text-emerald-500" />
                                Career-related questions only
                            </p>

                            <span className="text-xs text-slate-400 dark:text-slate-500">
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