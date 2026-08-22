import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBell,
  FaRobot,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { logout, fetchCurrentUser } from "../../features/auth/authAPI";

import { selectUser, selectLoading } from "../../features/auth/authSelectors";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      toast.success("Logged out successfully");
      navigate("/auth", { replace: true });
    } else {
      toast.error(result.payload || "Logout failed");
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-blue-600"
        >
          CareerFlow
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 xl:gap-10">

          <Link
            to="/search"
            className="text-gray-600 transition hover:text-blue-600"
          >
            <FaSearch className="text-lg sm:text-xl" />
          </Link>

          <Link
            to="/notifications"
            className="text-gray-600 transition hover:text-blue-600"
          >
            <FaBell className="text-lg sm:text-xl" />
          </Link>

          <Link
            to="/ai"
            className="text-gray-600 transition hover:text-blue-600"
          >
            <FaRobot className="text-lg sm:text-xl" />
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2"
          >
            {/* Profile Image / First Letter */}
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name || "Profile"}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border object-cover"
              />
            ) : (
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <span className="hidden lg:block font-medium">
              {user?.name || "User"}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center cursor-pointer gap-2 rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            <FaSignOutAlt />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;