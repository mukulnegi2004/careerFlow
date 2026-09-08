import { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../features/comment/commentAPI";

const CommentInput = ({ postId }) => {
    const dispatch = useDispatch();

    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        await dispatch(
            addComment({
                postId,
                text,
            })
        );

        setText("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                flex gap-3 p-4
                bg-slate-50
                dark:bg-slate-950
            "
        >
            <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="
                    min-w-0 flex-1 rounded-xl
                    border border-slate-200
                    bg-white px-3 py-2
                    text-slate-800
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-slate-100
                    dark:placeholder:text-slate-500
                "
            />

            <button
                type="submit"
                className="
                    cursor-pointer rounded-xl
                    bg-gradient-to-r
                    from-blue-600 to-indigo-600
                    px-5 py-2
                    font-semibold text-white
                    shadow-sm
                    transition-all duration-200
                    hover:from-blue-700
                    hover:to-indigo-700
                "
            >
                Post
            </button>
        </form>
    );
};

export default CommentInput;
