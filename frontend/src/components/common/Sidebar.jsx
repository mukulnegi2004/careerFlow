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
            <aside className="hidden md:sticky md:top-16 md:h-[calc(100vh-64px)] md:block w-64 bg-white border-r shadow-sm">
                <div className="p-4">
                    <h2 className="mb-4 text-lg font-semibold text-gray-700">
                        Navigation
                    </h2>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <NavLink                           //NavLink -> Navigates and also knows whether it is the current (active) route.
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}        //If item.path is /, then end={true}, For every other route end={false}, so React Router requires an exact match
                                className={({ isActive }) =>                   //isActive is true when the current URL matches this NavLink's path
                                    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
<nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg md:hidden">
    <div className="grid grid-cols-8 w-full px-1 py-2">
        {menuItems.map((item) => (
            <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                    `flex flex-col items-center justify-center text-[10px] ${
                        isActive
                            ? "text-blue-600"
                            : "text-gray-500"
                    }`
                }
            >
                <span className="text-lg">
                    {item.icon}
                </span>

                <span>
                    {item.name}
                </span>
            </NavLink>
        ))}
    </div>
</nav>
        </>
    );
};

export default Sidebar;