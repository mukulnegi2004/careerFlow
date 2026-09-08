import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserFriends, FaArrowRight } from "react-icons/fa";

import { selectUser } from "../../features/auth/authSelectors";

const ProfileConnections = ({ profile }) => {
    const currentUser = useSelector(selectUser);

    const isCurrentUserProfile =
        currentUser?._id && profile?._id
            ? currentUser._id === profile._id
            : false;

    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all duration-300
                dark:border-slate-800
                dark:bg-slate-900
                sm:p-6
            "
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2
                        className="
                            text-lg
                            font-bold
                            text-slate-900
                            dark:text-white
                        "
                    >
                        Connections
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        "
                    >
                        Professional network
                    </p>
                </div>

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                        dark:bg-blue-950/50
                        dark:text-blue-400
                    "
                >
                    <FaUserFriends className="text-lg" />
                </div>
            </div>

            {/* Connections Card */}
            {isCurrentUserProfile ? (
                <Link
                    to="/connections"
                    className="
                        group
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border border-blue-100
                        bg-gradient-to-r
                        from-blue-50
                        to-indigo-50
                        p-4
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:border-blue-200
                        hover:shadow-md
                        dark:border-blue-900/50
                        dark:from-blue-950/40
                        dark:to-indigo-950/40
                        dark:hover:border-blue-800
                    "
                >
                    {/* Icon */}
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-blue-600
                            to-indigo-600
                            text-xl
                            text-white
                            shadow-lg
                            shadow-blue-500/20
                        "
                    >
                        <FaUserFriends />
                    </div>

                    {/* Count */}
                    <div className="min-w-0 flex-1">
                        <p
                            className="
                                text-2xl
                                font-bold
                                text-blue-700
                                dark:text-blue-300
                            "
                        >
                            {profile?.connectionsCount || 0}
                        </p>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            {profile?.connectionsCount === 1
                                ? "Connection"
                                : "Connections"}
                        </p>
                    </div>

                    {/* Arrow */}
                    <FaArrowRight
                        className="
                            shrink-0
                            text-slate-400
                            transition-transform duration-300
                            group-hover:translate-x-1
                            group-hover:text-blue-600
                            dark:text-slate-500
                            dark:group-hover:text-blue-400
                        "
                    />
                </Link>
            ) : (
                <div
                    className="
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border border-slate-200
                        bg-slate-50
                        p-4
                        dark:border-slate-700
                        dark:bg-slate-800/60
                    "
                >
                    {/* Icon */}
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-slate-200
                            text-xl
                            text-slate-600
                            dark:bg-slate-700
                            dark:text-slate-300
                        "
                    >
                        <FaUserFriends />
                    </div>

                    {/* Count */}
                    <div className="min-w-0 flex-1">
                        <p
                            className="
                                text-2xl
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            {profile?.connectionsCount || 0}
                        </p>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            {profile?.connectionsCount === 1
                                ? "Connection"
                                : "Connections"}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProfileConnections;