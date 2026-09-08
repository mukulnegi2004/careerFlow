import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUserFriends,
  FaComments,
  FaBell,
  FaRobot,
  FaSearch,
  FaCompass,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: <FaCompass />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
  {
    name: "Search",
    path: "/search",
    icon: <FaSearch />,
  },
  {
    name: "Connections",
    path: "/connections",
    icon: <FaUserFriends />,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: <FaComments />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <FaBell />,
  },
  {
    name: "AI",
    path: "/ai",
    icon: <FaRobot />,
  },
];

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white transition-colors duration-300 md:sticky md:top-16 md:block md:h-[calc(100vh-64px)] dark:border-slate-800 dark:bg-slate-900">
        <div className="p-5">

          {/* Header */}
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Workspace
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
              Navigation
            </h2>
          </div>

          {/* Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  }`
                }
              >
                <span className="flex w-5 justify-center text-lg">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="
          fixed
          inset-x-0
          bottom-[-2px]
          z-[9999]
          block
          h-[66px]
          w-full
          border-t
          border-slate-200
          bg-white
          shadow-[0_-8px_30px_rgba(15,23,42,0.12)]
          transition-colors
          duration-300
          dark:border-slate-800
          dark:bg-slate-900
          md:hidden
        "
      >
        <div className="grid h-full w-full grid-cols-8 items-center px-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              aria-label={item.name}
              title={item.name}
              className={({ isActive }) =>
                `flex h-11 w-full items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:text-white dark:hover:bg-slate-800"
                }`
              }
            >
              {/* Larger mobile icon */}
              <span className="text-xl sm:text-1xl">
                {item.icon}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
