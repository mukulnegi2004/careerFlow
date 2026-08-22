import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

import { selectUser } from "../../features/auth/authSelectors";

import {
    toggleLikePost,
    removePost,
} from "../../features/post/postAPI";

import { selectCommentsByPost } from "../../features/comment/commentSelectors";


const PostActions = ({ post, onToggleComments }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const comments = useSelector(selectCommentsByPost(post._id));

    const commentCount = comments !== undefined ? comments.length : post.commentCount;

    const isLiked = currentUser && post.likes.some((id) => id === currentUser._id);
    const isOwner = currentUser && post.author._id === currentUser._id;


    const handleLike = () => {
        dispatch(toggleLikePost(post._id));
    };

    const handleDelete = () => {

        const confirmDelete = window.confirm("Delete this post?");

        if (!confirmDelete) return;

        dispatch(removePost(post._id));
    };

    return (

        <div className="border-t">

            {/* Like & Comment Count */}
            <div className="flex justify-between px-4 py-3 text-sm text-gray-500">
                <span>{post.likes.length} Likes</span>

                <span>{commentCount || 0} Comments</span>
            </div>

            {/* Buttons */}
            <div className={`grid border-t ${isOwner ? "grid-cols-3" : "grid-cols-2"}`}>

                {/* Like */}
                <button
                    onClick={handleLike}
                    className="flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition cursor-pointer"
                >
                    {isLiked ? (
                        <FaHeart className="text-red-500" />
                    ) : (
                        <FaRegHeart />
                    )}

                    <span>{isLiked ? "Liked" : "Like"}</span>
                </button>

                {/* Comment */}
                <button
                    onClick={onToggleComments}
                    className="flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition cursor-pointer"
                >
                    <FaRegComment />

                    <span>Comment</span>
                </button>

                {/* Delete */}
                {isOwner && (
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center gap-2 py-3 hover:bg-red-50 text-red-600 transition cursor-pointer"
                    >
                        <MdDeleteOutline size={20} />

                        <span>Delete</span>
                    </button>
                )}

            </div>

        </div>

    );

};

export default PostActions;