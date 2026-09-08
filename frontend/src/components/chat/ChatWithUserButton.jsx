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
                cursor-pointer
                inline-flex
                items-center
                justify-center
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
                shadow-lg
                shadow-blue-500/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:from-blue-700
                hover:to-indigo-700
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
            "
        >

            {loading ? (

                <>
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

                    Opening...

                </>

            ) : (

                <>

                    <svg
                        className="h-4 w-4"
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