import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";

const ProfileConnections = ({ profile }) => {
    return (
        <section className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Connections
            </h2>

            <Link to="/connections"
                className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-xl p-4 hover:bg-blue-100 hover:border-blue-200 transition cursor-pointer"
            >

                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                    <FaUserFriends />
                </div>

                <div>
                    <p className="text-2xl font-bold text-blue-700">{profile.connectionsCount}</p>

                    <p className="text-sm text-gray-500">
                        {profile.connectionsCount === 1 ? "Connection" : "Connections"}
                    </p>
                </div>

            </Link>

        </section>
    );
};

export default ProfileConnections;