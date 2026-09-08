import {
    useEffect,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    FaPaperPlane,
} from "react-icons/fa";

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

        if (!suggestedMessage) return;

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

        if (!trimmed) return;
        if (!chatId) return;
        if (sending) return;


        try {

            setSending(true);

            console.log("Sending message:", {
                chatId,
                text: trimmed,
            });

            await sendMessage({
                chatId,
                text: trimmed,
            });

            console.log("Message sent successfully");

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

                border-t
                border-slate-200

                bg-white

                px-3
                py-2.5

                sm:px-4
                sm:py-3

                dark:border-slate-800
                dark:bg-slate-900

                transition-colors
                duration-300
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-4xl
                    items-end
                    gap-2
                "
            >

                {/* INPUT */}

                <div
                    className="
                        flex
                        min-w-0
                        flex-1
                        items-end

                        rounded-2xl

                        border
                        border-slate-200

                        bg-slate-50

                        px-2
                        py-1.5

                        transition-all
                        duration-200

                        focus-within:border-blue-500
                        focus-within:bg-white
                        focus-within:ring-4
                        focus-within:ring-blue-500/10

                        dark:border-slate-700
                        dark:bg-slate-800

                        dark:focus-within:border-blue-500
                        dark:focus-within:bg-slate-800
                    "
                >

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
                            min-w-0
                            flex-1
                            resize-none
                            bg-transparent

                            px-2.5
                            py-2

                            text-sm
                            leading-5

                            text-slate-900

                            placeholder:text-slate-400

                            outline-none

                            max-h-28
                            overflow-y-auto

                            disabled:cursor-not-allowed
                            disabled:opacity-60

                            dark:text-white
                            dark:placeholder:text-slate-500
                        "
                    />

                </div>


                {/* SEND BUTTON */}

                <button
                    type="button"
                    onClick={handleSend}

                    disabled={
                        !text.trim() ||
                        sending
                    }

                    aria-label="Send message"

                    className="
                        cursor-pointer

                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl

                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600

                        text-white

                        shadow-md
                        shadow-blue-500/20

                        transition-all
                        duration-200

                        hover:-translate-y-0.5
                        hover:shadow-lg

                        active:translate-y-0
                        active:scale-95

                        disabled:cursor-not-allowed
                        disabled:from-slate-300
                        disabled:to-slate-300
                        disabled:shadow-none

                        dark:disabled:from-slate-700
                        dark:disabled:to-slate-700
                    "
                >

                    {sending ? (

                        <span
                            className="
                                h-4
                                w-4
                                animate-spin
                                rounded-full

                                border-2
                                border-white/40
                                border-t-white
                            "
                        />

                    ) : (

                        <FaPaperPlane
                            className="text-sm"
                        />

                    )}

                </button>

            </div>


            {/* DESKTOP HINT */}

            <p
                className="
                    mx-auto
                    mt-1.5
                    hidden
                    max-w-4xl
                    px-2

                    text-[10px]
                    text-slate-400

                    sm:block

                    dark:text-slate-500
                "
            >
                Press Enter to send · Shift + Enter for a new line
            </p>

        </div>
    );
};


export default MessageInput;