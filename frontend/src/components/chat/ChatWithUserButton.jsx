import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrGetChat } from "../../features/chat/chatAPI";


const ChatWithUserButton = ({ userId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const handleClick = async () => {

        if (!userId || loading) {
            return;
        }

        try {

            setLoading(true);

            const result = await dispatch(
                createOrGetChat(userId)
            );


            if (createOrGetChat.fulfilled.match(result)) {

                const chat = result.payload;

                navigate(`/chat/${chat._id}`);
            }

        } finally {

            setLoading(false);
        }
    };


    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-blue-600
                text-white
                text-sm
                font-semibold
                shadow-sm
                transition
                hover:bg-blue-700
                active:scale-[0.98]
                disabled:opacity-60
                disabled:cursor-not-allowed
            "
        >

            {loading ? (

                <>
                    <span
                        className="
                            w-4
                            h-4
                            border-2
                            border-white/40
                            border-t-white
                            rounded-full
                            animate-spin
                        "
                    />

                    Opening...
                </>

            ) : (

                <>
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
                            d="M8 10h8m-8 4h5m7-2a8 8 0 0 1-8 8 8.5 8.5 0 0 1-4-.99L4 20l.99-4A8.5 8.5 0 0 1 4 12a8 8 0 1 1 16 0Z"
                        />
                    </svg>

                    Message
                </>

            )}

        </button>
    );
};


export default ChatWithUserButton;