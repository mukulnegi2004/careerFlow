import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSelectors";

dayjs.extend(relativeTime);

const PostHeader = ({ post }) => {
    const { author, createdAt } = post;

    const currentUser = useSelector(selectUser);

    const profileLink =
        currentUser?._id === author._id
            ? "/profile"
            : `/users/${author._id}`;

    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <Link to={profileLink}>
                    {author?.profileImage ? (
                        <img
                            src={author.profileImage}
                            alt={author.name}
                            className="
                                h-12 w-12 rounded-full
                                border border-slate-200
                                object-cover
                                dark:border-slate-700
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex h-12 w-12 items-center
                                justify-center rounded-full
                                border border-slate-200
                                bg-slate-100
                                text-lg font-semibold
                                text-slate-600
                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:text-slate-200
                            "
                        >
                            {author?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                </Link>

                <div>
                    <Link
                        to={profileLink}
                        className="
                            font-semibold text-slate-900
                            transition-colors
                            hover:text-blue-600
                            dark:text-slate-100
                            dark:hover:text-blue-400
                        "
                    >
                        {author.name}
                    </Link>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {author.headline || "No headline"}
                    </p>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        {dayjs(createdAt).fromNow()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;
