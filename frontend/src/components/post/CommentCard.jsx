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

    const isOwner = user?._id?.toString() === comment.author?._id?.toString();

    const profileLink = user?._id?.toString() === comment.author?._id?.toString() ? "/profile" : `/users/${comment.author._id}`;

    const handleDelete = () => {
        dispatch(removeComment(comment._id));
    };

    return (

        <div className="flex items-center gap-3">

            <Link to={profileLink}>
                <img
                    src={comment.author.profileImage || "https://placehold.co/40x40?text=User"}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full object-cover border"
                />
            </Link>

            <div className="flex-1 bg-gray-100 rounded-lg p-3">

                <div className="flex items-center gap-2">
                    <Link
                        to={profileLink}
                        className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                    >
                        {comment.author.name}
                    </Link>

                    <span className="text-xs text-gray-400">
                        · {dayjs(comment.createdAt).fromNow()}
                    </span>


                    {isOwner && (
                        <button onClick={handleDelete} className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-700 cursor-pointer" > <MdDeleteOutline size={20} /> <span>Delete</span> </button>
                    )}
                </div>

                <p className="mt-2 text-gray-900">
                    {comment.text}
                </p>

            </div>

        </div>

    );
};

export default CommentCard;
