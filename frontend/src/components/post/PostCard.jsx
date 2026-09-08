import { useState } from "react";
import { useDispatch } from "react-redux";

import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

import { fetchPostComments } from "../../features/comment/commentAPI";

const PostCard = ({ post }) => {
    const dispatch = useDispatch();

    const [showComments, setShowComments] = useState(false);

    const handleToggleComments = () => {
        const next = !showComments;

        setShowComments(next);

        if (next) {
            dispatch(fetchPostComments(post._id));
        }
    };

    return (
        <article
            className="
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white shadow-sm
                transition-colors duration-300
                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            <PostHeader post={post} />

            <PostBody post={post} />

            <PostActions
                post={post}
                onToggleComments={handleToggleComments}
            />

            {showComments && (
                <div className="border-t border-slate-200 dark:border-slate-800">
                    <CommentInput postId={post._id} />

                    <CommentList postId={post._id} />
                </div>
            )}
        </article>
    );
};

export default PostCard;
