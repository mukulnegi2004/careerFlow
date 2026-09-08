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
import {
  selectUser,
  selectLoading,
} from "../../features/auth/authSelectors";
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
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-blue-600 transition hover:text-indigo-600 sm:text-2xl dark:text-blue-400 dark:hover:text-indigo-400"
        >
          Career<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">

          {/* Search */}
          <Link
            to="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            <FaSearch className="text-base sm:text-lg" />
          </Link>

          {/* Notifications */}
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            <FaBell className="text-base sm:text-lg" />
          </Link>

          {/* AI */}
          <Link
            to="/ai"
            aria-label="AI"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            <FaRobot className="text-base sm:text-lg" />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="group flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name || "Profile"}
                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm dark:border-slate-700 sm:h-10 sm:w-10"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-sm dark:border-slate-700 sm:h-10 sm:w-10">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <span className="hidden max-w-28 truncate font-semibold text-slate-700 transition group-hover:text-blue-600 lg:block dark:text-slate-200 dark:group-hover:text-blue-400">
              {user?.name || "User"}
            </span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/40 sm:px-4"
          >
            <FaSignOutAlt />

            <span className="hidden sm:inline">
              {loading ? "Logging out..." : "Logout"}
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
