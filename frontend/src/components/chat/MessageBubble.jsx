// src/components/chat/MessageBubble.jsx

const formatDateTime = (dateStr) => {

    if (!dateStr) return "";

    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

};


const MessageBubble = ({
    message,
    isOwn,
}) => {

    return (

        <div
            className={`
                flex
                w-full
                ${isOwn
                    ? "justify-end"
                    : "justify-start"
                }
            `}
        >

            <div
                className={`
                    group
                    max-w-[85%]
                    sm:max-w-[70%]

                    rounded-2xl

                    px-3.5
                    py-2.5

                    shadow-sm

                    ${
                        isOwn

                            ? `
                                rounded-br-md

                                bg-gradient-to-br
                                from-blue-600
                                to-indigo-600

                                text-white

                                shadow-blue-500/10
                            `

                            : `
                                rounded-bl-md

                                border
                                border-slate-200

                                bg-white

                                text-slate-900

                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:text-slate-100
                            `
                    }
                `}
            >

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <p
                    className="
                        whitespace-pre-wrap
                        break-words

                        text-[13px]
                        leading-5

                        sm:text-sm
                        sm:leading-5
                    "
                >
                    {message.text}
                </p>


                {/* =================================================
                    TIME
                ================================================= */}

                <div
                    className={`
                        mt-1.5
                        flex
                        items-center
                        justify-end
                        gap-1

                        text-[9px]
                        leading-none

                        sm:text-[10px]

                        ${
                            isOwn
                                ? "text-blue-100"
                                : "text-slate-400 dark:text-slate-500"
                        }
                    `}
                >

                    <span>
                        {formatDateTime(message.createdAt)}
                    </span>


                    {/* =================================================
                        SENT CHECK
                    ================================================= */}

                    {isOwn && (

                        <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m5 12 4 4L19 6"
                            />

                        </svg>

                    )}

                </div>

            </div>

        </div>

    );

};


export default MessageBubble;