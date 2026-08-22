import {
    useEffect,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    sendMessage,
} from "../../sockets/messageSocket";


const MessageInput = ({ chatId }) => {

    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();


    // =========================================================
    // RECEIVE AI SUGGESTION
    // =========================================================

    useEffect(() => {

        const suggestedMessage =
            location.state?.suggestedMessage;

        if (!suggestedMessage) {
            return;
        }

        setText(suggestedMessage);

        navigate(
            location.pathname,
            {
                replace: true,
                state: null,
            }
        );

    }, [
        location.state,
        location.pathname,
        navigate,
    ]);


    // =========================================================
    // SEND MESSAGE
    // =========================================================

    const handleSend = async () => {

        const trimmed = text.trim();

        if (!trimmed) {
            return;
        }

        if (!chatId) {
            return;
        }

        if (sending) {
            return;
        }


        try {

            setSending(true);


            // =================================================
            // SEND MESSAGE
            //
            // If access token is expired:
            //
            // 1. Backend sends MESSAGE_AUTH_ERROR
            // 2. refreshAccessToken() runs
            // 3. Socket reconnects with new token
            // 4. Same message is automatically sent again
            //
            // =================================================

            await sendMessage({
                chatId,
                text: trimmed,
            });


            // Clear only after send flow succeeds
            setText("");


        } catch (error) {

            console.error(
                "Failed to send message:",
                error
            );

        } finally {

            setSending(false);

        }

    };


    // =========================================================
    // KEYBOARD
    // =========================================================

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            handleSend();

        }

    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <div
            className="
                shrink-0
                bg-white
                border-t
                border-gray-200
                px-3
                py-3
                sm:px-4
                sm:py-4
            "
        >

            {/* =================================================
                INPUT CONTAINER
            ================================================= */}

            <div
                className="
                    flex
                    items-end
                    gap-2
                    sm:gap-3
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-2xl
                    p-1.5
                    sm:p-2
                    transition
                    focus-within:bg-white
                    focus-within:border-blue-400
                    focus-within:ring-2
                    focus-within:ring-blue-100
                "
            >

                {/* =================================================
                    TEXTAREA
                ================================================= */}

                <textarea
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Write a message..."
                    rows={1}
                    disabled={sending}
                    className="
                        flex-1
                        min-w-0
                        resize-none
                        bg-transparent
                        px-3
                        py-2
                        text-sm
                        text-gray-900
                        placeholder:text-gray-400
                        outline-none
                        leading-5
                        max-h-32
                        overflow-y-auto
                        disabled:opacity-60
                    "
                />


                {/* =================================================
                    SEND BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={
                        !text.trim() ||
                        sending
                    }
                    aria-label="Send message"
                    className="
                        shrink-0
                        w-10
                        h-10
                        sm:w-auto
                        sm:h-10
                        sm:px-4
                        rounded-xl
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-sm
                        font-semibold
                        transition
                        hover:bg-blue-700
                        active:scale-95
                        disabled:bg-gray-300
                        disabled:cursor-not-allowed
                        disabled:active:scale-100
                    "
                >

                    {/* Send icon */}

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
                            d="m22 2-7 20-4-9-9-4Z"
                        />

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M22 2 11 13"
                        />

                    </svg>


                    {/* Send text */}

                    <span className="hidden sm:inline">
                        {sending
                            ? "Sending..."
                            : "Send"
                        }
                    </span>

                </button>

            </div>


            {/* =================================================
                HINT
            ================================================= */}

            <p
                className="
                    hidden
                    sm:block
                    text-[11px]
                    text-gray-400
                    mt-2
                    px-2
                "
            >
                Press Enter to send · Shift + Enter for a new line
            </p>

        </div>

    );

};


export default MessageInput;