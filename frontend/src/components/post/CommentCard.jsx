import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

import { Link } from "react-router-dom";

import { removeComment } from "../../features/comment/commentAPI";
import { selectUser } from "../../features/auth/authSelectors";

dayjs.extend(relativeTime);

const CommentCard = ({ comment }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const isOwner =
        user?._id?.toString() ===
        comment.author?._id?.toString();

    const profileLink =
        user?._id?.toString() ===
        comment.author?._id?.toString()
            ? "/profile"
            : `/users/${comment.author._id}`;

    const handleDelete = () => {
        dispatch(removeComment(comment._id));
    };

    return (
        <div className="flex items-start gap-3">

            {/* Profile Image */}
            <Link
                to={profileLink}
                className="shrink-0"
            >
                <img
                    src={
                        comment.author.profileImage ||
                        "https://placehold.co/40x40?text=User"
                    }
                    alt={comment.author.name}
                    className="
                        h-10 w-10 rounded-full
                        border border-slate-200
                        object-cover
                        transition-colors duration-300
                        dark:border-slate-700
                    "
                />
            </Link>

            {/* Comment Content */}
            <div
                className="
                    min-w-0 flex-1
                    rounded-2xl rounded-tl-md
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    transition-colors duration-300
                    dark:border-slate-700
                    dark:bg-slate-800
                "
            >

                {/* Header */}
                <div className="flex min-w-0 items-center gap-2">

                    {/* Author */}
                    <Link
                        to={profileLink}
                        className="
                            min-w-0 truncate
                            text-sm font-semibold
                            text-slate-800
                            transition-colors duration-200
                            hover:text-blue-600
                            dark:text-slate-100
                            dark:hover:text-blue-400
                        "
                    >
                        {comment.author.name}
                    </Link>

                    {/* Time */}
                    <span
                        className="
                            shrink-0 text-xs
                            text-slate-400
                            dark:text-slate-500
                        "
                    >
                        · {dayjs(comment.createdAt).fromNow()}
                    </span>

                    {/* Delete */}
                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            className="
                                ml-auto flex shrink-0
                                cursor-pointer
                                items-center gap-1
                                rounded-lg px-2 py-1
                                text-xs font-medium
                                text-red-500
                                transition-all duration-200
                                hover:bg-red-50
                                hover:text-red-600
                                dark:text-red-400
                                dark:hover:bg-red-950/40
                                dark:hover:text-red-300
                            "
                        >
                            <MdDeleteOutline size={18} />

                            <span className="hidden sm:inline">
                                Delete
                            </span>
                        </button>
                    )}
                </div>

                {/* Comment Text */}
                <p
                    className="
                        mt-2 whitespace-pre-wrap
                        break-words
                        text-sm leading-6
                        text-slate-700
                        dark:text-slate-300
                    "
                >
                    {comment.text}
                </p>

            </div>
        </div>
    );
};

export default CommentCard;