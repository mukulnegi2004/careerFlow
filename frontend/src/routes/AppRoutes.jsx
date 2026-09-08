import { Route, Routes } from "react-router-dom";              //routes -> Container that holds all routes, route -> Defines one URL path and the component to render.

import MainLayout from "../layouts/MainLayout";                       //layout is a wrapper shared by multiple pages
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";                                    //pages, These are the actual screens shown to the user
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import UserProfile from "../pages/UserProfile";
import Search from "../pages/Search";
import Connections from "../pages/Connections";
import Notifications from "../pages/Notifications";
import Chat from "../pages/Chat";
import Ai from "../pages/AI";
import NotFound from "../pages/NotFound";
import Auth from "../pages/Auth";
import Explore from "../pages/Explore";
import ChatConversation from "../pages/ChatConversation";
import AiReplySuggestions from "../pages/AiReplySuggestions";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>                                                          // Acts like a container for all public routes.
            <Route element={<AuthLayout />}>                               //All child pages uses AuthLayout.
                <Route path="/auth" element={<Auth />} />
            </Route>

            <Route element={<ProtectedRoute />}>                                 //For users who ARE logged in
                <Route element={<MainLayout />}>                                  //All child pages use MainLayout.
                    <Route path="/" element={<Home />} />                          //show feed (connected user post)
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/connections" element={<Connections />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat/:chatId" element={<ChatConversation />} />
                    <Route path="/explore" element={<Explore />} />

                    <Route path="/ai" element={<Ai />} />
                    <Route path="/ai/reply/:chatId" element={<AiReplySuggestions />}/>
                </Route>
            </Route>


            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}


export default AppRoutes;