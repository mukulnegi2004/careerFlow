import { useSelector } from "react-redux";

import CommentCard from "./CommentCard";

import { selectCommentsByPost } from "../../features/comment/commentSelectors";

const CommentList = ({ postId }) => {

    const comments = useSelector(
        selectCommentsByPost(postId)
    );

    if (!Array.isArray(comments)) {
        return null;
    }

    if (comments.length === 0) {
        return (
            <p className="px-4 py-4 text-gray-500">
                No comments yet.
            </p>
        );
    }

    return (

        <div className="space-y-3 px-4 pb-4">

            {comments.map((comment) => (
                <CommentCard
                    key={comment._id}
                    comment={comment}
                />
            ))}

        </div>

    );
};

export default CommentList;