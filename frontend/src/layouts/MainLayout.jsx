import { Outlet } from "react-router-dom";
import useSocket from "../hooks/useSocket";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = () => {
  useSocket();
  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;