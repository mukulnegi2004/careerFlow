import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

const ProfileHeader = ({ profile }) => {

    return (

        <section className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Left */}
                <div className="flex items-center gap-5">
                    {/* Profile Image / Default Letter */}
                    {profile?.profileImage ? (

                        <img
                            src={profile.profileImage}
                            alt={profile.name}
                            className="w-28 h-28 rounded-full object-cover border"
                        />

                    ) : (

                        <div className="w-28 h-28 rounded-full border bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                            {profile?.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                    )}


                    <div>
                        <h1 className="text-3xl font-bold">{profile.name}</h1>
                        <p className="text-gray-600 mt-1">{profile.headline || "No headline added"}</p>
                        <p className="text-sm text-gray-500 mt-2">{profile.email}</p>
                    </div>
                </div>

                {/* Right */}
                <Link
                    to="/profile/edit"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                >
                    <FaUserEdit />
                    <span>Edit Profile</span>
                </Link>

            </div>
        </section>

    );

};

export default ProfileHeader;