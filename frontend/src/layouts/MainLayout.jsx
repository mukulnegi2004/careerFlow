import { Outlet, useLocation } from "react-router-dom";
import useSocket from "../hooks/useSocket";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = () => {
    useSocket();

    const location = useLocation();

    // /chat/:chatId
    const isChatConversation = location.pathname.startsWith("/chat/");

    return (
        <div
            className={
                isChatConversation
                    ? `
                        flex
                        h-dvh
                        flex-col
                        overflow-hidden

                        bg-slate-50
                        text-slate-900

                        transition-colors
                        duration-300

                        dark:bg-slate-950
                        dark:text-white
                    `
                    : `
                        min-h-screen

                        bg-slate-50
                        text-slate-900

                        transition-colors
                        duration-300

                        dark:bg-slate-950
                        dark:text-white
                    `
            }
        >

            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <Navbar />


            {/* =====================================================
                APP BODY
            ===================================================== */}

            <div
                className={
                    isChatConversation
                        ? `
                            flex
                            min-h-0
                            flex-1
                            overflow-hidden
                        `
                        : `
                            flex
                            min-h-screen
                        `
                }
            >

                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <Sidebar />


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <main
                    className={
                        isChatConversation
                            ? `
                                min-h-0
                                min-w-0
                                flex-1

                                overflow-hidden

                                p-0
                            `
                            : `
                                min-w-0
                                flex-1

                                p-4
                                pb-20

                                sm:p-6
                                sm:pb-20

                                md:p-6
                                md:pb-6
                            `
                    }
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default MainLayout;