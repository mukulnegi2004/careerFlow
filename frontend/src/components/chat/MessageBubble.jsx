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
                    max-w-[80%]
                    sm:max-w-[70%]
                    px-3.5
                    py-2.5
                    rounded-2xl
                    shadow-sm

                    ${isOwn
                        ? `
                            bg-blue-600
                            text-white
                            rounded-br-md
                        `
                        : `
                            bg-white
                            text-gray-900
                            border
                            border-gray-200
                            rounded-bl-md
                        `
                    }
                `}
            >

                {/* Message text */}

                <p className="
                    whitespace-pre-wrap
                    break-words
                    text-sm
                    leading-5
                ">
                    {message.text}
                </p>


                {/* Date + Time */}

                <div
                    className={`
                        flex
                        justify-end
                        items-center
                        gap-1
                        text-[10px]
                        mt-1
                        leading-none

                        ${isOwn
                            ? "text-blue-100"
                            : "text-gray-400"
                        }
                    `}
                >

                    {formatDateTime(message.createdAt)}

                    {/* Sent indicator */}

                    {isOwn && (
                        <svg
                            className="w-3 h-3"
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