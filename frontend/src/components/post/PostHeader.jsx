import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSelectors";

dayjs.extend(relativeTime);

const PostHeader = ({ post }) => {
    const { author, createdAt } = post;
    const currentUser = useSelector(selectUser);

    const profileLink = currentUser?._id === author._id ? "/profile" : `/users/${author._id}`;

    return (

        <div className="flex items-center justify-between p-4">

            <div className="flex items-center gap-3">
                <Link to={profileLink}>
                    {author?.profileImage ? (
                        <img
                            src={author.profileImage}
                            alt={author.name}
                            className="w-12 h-12 rounded-full object-cover border"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full border bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
                            {author?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                </Link>

                <div>
                    <Link to={profileLink} className="font-semibold text-gray-900 hover:text-blue-600">{author.name}</Link>

                    <p className="text-sm text-gray-500">{author.headline || "No headline"}</p>

                    <p className="text-xs text-gray-400">
                        {dayjs(createdAt).fromNow()}
                    </p>

                </div>

            </div>

        </div>

    );

};

export default PostHeader;