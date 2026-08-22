import { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../features/comment/commentAPI";

const CommentInput = ({ postId }) => {

    const dispatch = useDispatch();

    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        await dispatch(addComment({ postId, text }));

        setText("");
    };

    return (

        <form onSubmit={handleSubmit} className="flex gap-3 p-4">

            <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
            />

            <button className="bg-blue-600 text-white px-5 rounded-lg cursor-pointer">Post</button>

        </form>

    );

};

export default CommentInput;