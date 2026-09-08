import { Link } from "react-router-dom";
import { FaUserEdit, FaEnvelope } from "react-icons/fa";

const ProfileHeader = ({ profile }) => {
    return (
        <section
            className="
                relative overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
                transition-colors duration-300
                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            {/* Decorative background */}
            <div
                className="
                    absolute inset-x-0 top-0 h-28
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-violet-600
                    opacity-95
                "
            />

            <div className="relative px-5 pb-6 pt-16 sm:px-7">

                <div
                    className="
                        flex flex-col gap-5
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
                >
                    {/* Left */}
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">

                        {/* Profile Image */}
                        <div className="shrink-0">
                            {profile?.profileImage ? (
                                <img
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    className="
                                        h-28 w-28
                                        rounded-2xl
                                        border-4
                                        border-white
                                        object-cover
                                        shadow-lg
                                        dark:border-slate-900
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        flex h-28 w-28
                                        items-center justify-center
                                        rounded-2xl
                                        border-4
                                        border-white
                                        bg-slate-100
                                        text-4xl font-bold
                                        text-slate-500
                                        shadow-lg
                                        dark:border-slate-900
                                        dark:bg-slate-800
                                        dark:text-slate-300
                                    "
                                >
                                    {profile?.name
                                        ?.charAt(0)
                                        .toUpperCase() || "U"}
                                </div>
                            )}
                        </div>

                        {/* User Details */}
                        <div className="min-w-0 pb-1">
                            <h1
                                className="
                                    truncate text-2xl font-bold
                                    tracking-tight
                                    text-slate-900
                                    dark:text-white
                                    sm:text-3xl
                                "
                            >
                                {profile.name}
                            </h1>

                            <p
                                className="
                                    mt-1 max-w-xl
                                    text-sm font-medium
                                    text-slate-600
                                    dark:text-slate-300
                                "
                            >
                                {profile.headline ||
                                    "No headline added"}
                            </p>

                            <div
                                className="
                                    mt-2 flex items-center gap-2
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                <FaEnvelope className="shrink-0 text-xs" />
                                <span className="truncate">
                                    {profile.email}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <Link
                        to="/profile/edit"
                        className="
                            flex shrink-0 items-center
                            justify-center gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            px-5 py-3
                            text-sm font-semibold
                            text-white
                            shadow-md
                            shadow-blue-500/20
                            transition-all duration-200
                            hover:-translate-y-0.5
                            hover:from-blue-700
                            hover:to-indigo-700
                            hover:shadow-lg
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2
                            dark:focus:ring-offset-slate-900
                        "
                    >
                        <FaUserEdit />
                        <span>Edit Profile</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;