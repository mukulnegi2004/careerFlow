const UserProfileHeader = ({ profile }) => {
    return (
        <section
            className="
                overflow-hidden
                rounded-3xl
                border border-slate-200
                bg-white
                shadow-sm
                transition-colors duration-300
                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            {/* Cover */}
            <div
                className="
                    relative
                    z-0
                    h-32
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-violet-600
                    sm:h-40
                "
            >
                {/* Decorative background */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-10
                        -top-16
                        h-40
                        w-40
                        rounded-full
                        bg-white/10
                        blur-2xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-20
                        left-1/3
                        h-40
                        w-40
                        rounded-full
                        bg-white/10
                        blur-3xl
                    "
                />
            </div>

            {/* Profile Content */}
            <div className="px-5 pb-6 sm:px-7">

                {/* Profile Image */}
                <div className="relative z-20 -mt-12 sm:-mt-14">
                    {profile?.profileImage ? (
                        <img
                            src={profile.profileImage}
                            alt={profile?.name || "Profile"}
                            className="
                                block
                                h-24
                                w-24
                                rounded-full
                                border-4
                                border-white
                                bg-slate-100
                                object-cover
                                shadow-xl
                                ring-2
                                ring-white/30
                                sm:h-28
                                sm:w-28
                                dark:border-slate-900
                                dark:bg-slate-800
                                dark:ring-slate-700
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-24
                                w-24
                                items-center
                                justify-center
                                rounded-full
                                border-4
                                border-white
                                bg-gradient-to-br
                                from-blue-500
                                to-indigo-600
                                text-3xl
                                font-bold
                                text-white
                                shadow-xl
                                ring-2
                                ring-white/30
                                sm:h-28
                                sm:w-28
                                sm:text-4xl
                                dark:border-slate-900
                                dark:ring-slate-700
                            "
                        >
                            {profile?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                </div>

                {/* Name + Headline */}
                <div className="relative z-10 mt-4">

                    <h1
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-3xl
                            dark:text-white
                        "
                    >
                        {profile?.name || "Unknown User"}
                    </h1>

                    <p
                        className="
                            mt-1
                            max-w-2xl
                            text-sm
                            leading-6
                            text-slate-600
                            sm:text-base
                            dark:text-slate-300
                        "
                    >
                        {profile?.headline || "No headline"}
                    </p>

                    {/* Email */}
                    {profile?.email && (
                        <p
                            className="
                                mt-2
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-slate-100
                                    text-xs
                                    font-semibold
                                    text-slate-600
                                    dark:bg-slate-800
                                    dark:text-slate-300
                                "
                            >
                                @
                            </span>

                            <span className="break-all">
                                {profile.email}
                            </span>
                        </p>
                    )}
                </div>

                {/* Stats */}
                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                    "
                >
                    {/* Posts */}
                    <div
                        className="
                            min-w-[120px]
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-5
                            py-3
                            transition-colors
                            dark:border-slate-700
                            dark:bg-slate-800/70
                        "
                    >
                        <p
                            className="
                                text-xl
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            {profile?.postsCount || 0}
                        </p>

                        <p
                            className="
                                mt-0.5
                                text-xs
                                font-medium
                                uppercase
                                tracking-wider
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Posts
                        </p>
                    </div>

                    {/* Connections */}
                    <div
                        className="
                            min-w-[140px]
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-5
                            py-3
                            transition-colors
                            dark:border-slate-700
                            dark:bg-slate-800/70
                        "
                    >
                        <p
                            className="
                                text-xl
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            {profile?.connectionsCount || 0}
                        </p>

                        <p
                            className="
                                mt-0.5
                                text-xs
                                font-medium
                                uppercase
                                tracking-wider
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Connections
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileHeader;