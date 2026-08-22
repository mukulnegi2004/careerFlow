
const UserProfileHeader = ({ profile }) => {

    return (
        <section className="bg-white rounded-xl shadow overflow-hidden">

            {/* Cover */}
            <div className="h-32 bg-gray-200"></div>

            <div className="px-6 pb-6">

                {/* Profile Image */}
                <div className="-mt-12">

                    {profile?.profileImage ? (
                        <img
                            src={profile.profileImage}
                            alt={profile.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center text-3xl font-semibold text-gray-600">
                            {profile?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}

                </div>

                {/* Name */}
                <h1 className="text-2xl font-bold mt-3">
                    {profile?.name}
                </h1>

                {/* Headline */}
                <p className="text-gray-600 mt-1">
                    {profile?.headline || "No headline"}
                </p>

                {/* Email */}
                <p className="text-gray-500 mt-2">
                    {profile?.email}
                </p>

                {/* Counts */}
                <div className="flex gap-6 mt-4 text-sm">

                    <div>
                        <span className="font-semibold text-gray-900">
                            {profile?.postsCount || 0}
                        </span>

                        <span className="text-gray-500 ml-1">
                            Posts
                        </span>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-900">
                            {profile?.connectionsCount || 0}
                        </span>

                        <span className="text-gray-500 ml-1">
                            Connections
                        </span>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default UserProfileHeader;