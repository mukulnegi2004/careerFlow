import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Chat
import ChatWithUserButton from "../components/chat/ChatWithUserButton";

// User
import { fetchUserProfile } from "../features/user/userAPI";

import {
    selectUserProfile,
    selectUserLoading,
    selectUserError
} from "../features/user/userSelectors";

// Auth
import { selectUser } from "../features/auth/authSelectors";

// Connection
import {
    sendRequest,
    acceptRequest,
    rejectRequest,
    fetchPendingRequests,
    fetchConnections,
    removeConnectionRequest
} from "../features/connection/connectionAPI";

import {
    selectPendingRequests,
    selectConnections,
    selectConnectionActionLoading
} from "../features/connection/connectionSelectors";

// Posts
import { fetchUserPosts } from "../features/post/postAPI";

import {
    selectUserPosts,
    selectUserPostsPage,
    selectUserPostsLoading,
    selectHasMoreUserPosts
} from "../features/post/postSelectors";

// Components
import UserProfileHeader from "../components/profile/UserProfileHeader";
import AboutSection from "../components/profile/AboutSection";
import SkillsSection from "../components/profile/SkillsSection";
import EducationSection from "../components/profile/EducationSection";
import ExperienceSection from "../components/profile/ExperienceSection";
import ProfileConnections from "../components/profile/ProfileConnections";
import PostCard from "../components/post/PostCard";
import Loader from "../components/common/Loader";


const UserProfile = () => {

    const dispatch = useDispatch();

    const { userId } = useParams();


    // =========================================================
    // CURRENT LOGGED-IN USER
    // =========================================================

    const currentUser = useSelector(selectUser);


    // =========================================================
    // OTHER USER PROFILE
    // =========================================================

    const profile = useSelector(selectUserProfile);

    const loading = useSelector(selectUserLoading);

    const error = useSelector(selectUserError);


    // =========================================================
    // CONNECTION STATE
    // =========================================================

    const pendingRequests = useSelector(selectPendingRequests);

    const connections = useSelector(selectConnections);

    const actionLoading = useSelector(
        selectConnectionActionLoading
    );


    // =========================================================
    // USER POSTS
    // =========================================================

    const posts = useSelector(selectUserPosts);

    const currentPage = useSelector(selectUserPostsPage);

    const postLoading = useSelector(selectUserPostsLoading);

    const hasMorePosts = useSelector(selectHasMoreUserPosts);

    const LIMIT = 5;


    // =========================================================
    // FETCH USER PROFILE
    // =========================================================

    useEffect(() => {

        if (!userId) return;

        dispatch(fetchUserProfile(userId));

    }, [dispatch, userId]);


    // =========================================================
    // FETCH CONNECTION DATA
    // =========================================================

    useEffect(() => {

        dispatch(fetchPendingRequests());

        dispatch(fetchConnections());

    }, [dispatch]);


    // =========================================================
    // FETCH USER POSTS
    // ONLY AFTER CONNECTION IS ACCEPTED
    // =========================================================

    useEffect(() => {

        if (!profile?._id) return;

        if (profile.connectionStatus !== "accepted") return;

        dispatch(
            fetchUserPosts({
                userId: profile._id,
                page: 1,
                limit: LIMIT
            })
        );

    }, [
        dispatch,
        profile?._id,
        profile?.connectionStatus
    ]);


    // =========================================================
    // LOAD NEXT PAGE OF USER POSTS
    // =========================================================

    useEffect(() => {

        if (!profile?._id) return;

        if (profile.connectionStatus !== "accepted") return;

        const handleScroll = () => {

            if (postLoading) return;

            if (!hasMorePosts) return;

            const scrollPosition =
                window.innerHeight + window.scrollY;

            const pageHeight =
                document.documentElement.scrollHeight;

            if (scrollPosition >= pageHeight - 100) {

                dispatch(
                    fetchUserPosts({
                        userId: profile._id,
                        page: currentPage + 1,
                        limit: LIMIT
                    })
                );

            }

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, [
        dispatch,
        profile?._id,
        profile?.connectionStatus,
        currentPage,
        postLoading,
        hasMorePosts
    ]);


    // =========================================================
    // FIND INCOMING REQUEST
    // =========================================================

    const incomingRequest = pendingRequests.find(
        (request) =>
            String(request.sender?._id) ===
            String(profile?._id)
    );


    // =========================================================
    // FIND ACCEPTED CONNECTION
    // =========================================================

    const acceptedConnection = connections.find(
        (connection) => {

            const senderId =
                String(connection.sender?._id);

            const receiverId =
                String(connection.receiver?._id);

            const currentUserId =
                String(currentUser?._id);

            const profileId =
                String(profile?._id);


            return (
                (
                    senderId === currentUserId &&
                    receiverId === profileId
                )
                ||
                (
                    senderId === profileId &&
                    receiverId === currentUserId
                )
            );

        }
    );


    // =========================================================
    // CONNECTION STATUS
    // =========================================================

    const connectionStatus =
        profile?.connectionStatus;


    // =========================================================
    // OWN PROFILE?
    // =========================================================

    const isOwnProfile =
        String(currentUser?._id) ===
        String(profile?._id);


    // =========================================================
    // SEND REQUEST
    // =========================================================

    const handleSendRequest = async () => {

        if (!profile?._id) return;

        try {

            await dispatch(
                sendRequest(profile._id)
            ).unwrap();

            toast.success(
                "Connection request sent"
            );

            dispatch(
                fetchUserProfile(profile._id)
            );

            dispatch(
                fetchPendingRequests()
            );

        } catch (error) {

            toast.error(
                error || "Failed to send connection request"
            );

        }

    };


    // =========================================================
    // ACCEPT REQUEST
    // =========================================================

    const handleAcceptRequest = async () => {

        if (!incomingRequest?._id) return;

        try {

            await dispatch(
                acceptRequest(incomingRequest._id)
            ).unwrap();

            toast.success(
                "Connection accepted"
            );

            dispatch(
                fetchUserProfile(profile._id)
            );

            dispatch(
                fetchConnections()
            );

            dispatch(
                fetchPendingRequests()
            );

        } catch (error) {

            toast.error(
                error || "Failed to accept request"
            );

        }

    };


    // =========================================================
    // REJECT REQUEST
    // =========================================================

    const handleRejectRequest = async () => {

        if (!incomingRequest?._id) return;

        try {

            await dispatch(
                rejectRequest(incomingRequest._id)
            ).unwrap();

            toast.success(
                "Connection request rejected"
            );

            dispatch(
                fetchUserProfile(profile._id)
            );

            dispatch(
                fetchPendingRequests()
            );

        } catch (error) {

            toast.error(
                error || "Failed to reject request"
            );

        }

    };


    // =========================================================
    // REMOVE CONNECTION
    // =========================================================

    const handleRemoveConnection = async () => {

        if (!acceptedConnection?._id) {

            toast.error(
                "Connection ID not found"
            );

            return;
        }


        try {

            await dispatch(
                removeConnectionRequest(
                    acceptedConnection._id
                )
            ).unwrap();

            toast.success(
                "Connection removed"
            );

            dispatch(
                fetchUserProfile(profile._id)
            );

            dispatch(
                fetchConnections()
            );

        } catch (error) {

            toast.error(
                error || "Failed to remove connection"
            );

        }

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="
                flex
                min-h-[60vh]
                items-center
                justify-center
            ">
                <Loader />
            </div>
        );

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="
                mx-auto
                flex
                min-h-[60vh]
                max-w-4xl
                items-center
                justify-center
                px-4
            ">

                <div className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-red-200
                    bg-white
                    p-8
                    text-center
                    shadow-xl
                    shadow-red-500/5
                    dark:border-red-900/50
                    dark:bg-slate-900
                ">

                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-red-50
                        text-2xl
                        text-red-500
                        dark:bg-red-950/40
                    ">
                        !
                    </div>

                    <h2 className="
                        text-xl
                        font-bold
                        text-slate-900
                        dark:text-white
                    ">
                        Something went wrong
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-500
                        dark:text-slate-400
                    ">
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // PROFILE NOT FOUND
    // =========================================================

    if (!profile) {

        return (

            <div className="
                mx-auto
                flex
                min-h-[60vh]
                max-w-4xl
                items-center
                justify-center
                px-4
            ">

                <div className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    text-center
                    shadow-xl
                    shadow-slate-900/5
                    dark:border-slate-800
                    dark:bg-slate-900
                ">

                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-100
                        text-2xl
                        dark:bg-slate-800
                    ">
                        👤
                    </div>

                    <h2 className="
                        text-xl
                        font-bold
                        text-slate-900
                        dark:text-white
                    ">
                        User not found
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    ">
                        This profile may have been removed or
                        is no longer available.
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="
            mx-auto
            w-full
            max-w-5xl
            px-3
            py-5
            sm:px-5
            sm:py-7
            lg:px-6
        ">

            <div className="space-y-5 sm:space-y-6">


                {/* =================================================
                    PROFILE HEADER
                ================================================= */}

                <section className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    shadow-slate-900/5
                    transition-colors
                    duration-300
                    dark:border-slate-800
                    dark:bg-slate-900
                ">

                    <UserProfileHeader
                        profile={profile}
                    />

                </section>


                {/* =================================================
                    CONNECTION ACTIONS
                ================================================= */}

                {!isOwnProfile && (

                    <section className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        shadow-slate-900/5
                        transition-colors
                        duration-300
                        sm:p-5
                        dark:border-slate-800
                        dark:bg-slate-900
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-widest
                                    text-slate-400
                                    dark:text-slate-500
                                ">
                                    Connection
                                </p>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-slate-600
                                    dark:text-slate-300
                                ">
                                    Manage your connection with{" "}
                                    <span className="
                                        font-semibold
                                        text-slate-900
                                        dark:text-white
                                    ">
                                        {profile.name}
                                    </span>
                                </p>

                            </div>


                            {/* NO CONNECTION */}

                            {connectionStatus === "none" && (

                                <button
                                    onClick={handleSendRequest}
                                    disabled={actionLoading}
                                    className="
                                        cursor-pointer
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-indigo-600
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-lg
                                        shadow-blue-500/20
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:from-blue-700
                                        hover:to-indigo-700
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                        disabled:hover:translate-y-0
                                    "
                                >

                                    {actionLoading
                                        ? "Sending..."
                                        : "Connect"
                                    }

                                </button>

                            )}


                            {/* PENDING */}

                            {connectionStatus === "pending" && (

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-2
                                ">

                                    {incomingRequest ? (

                                        <>

                                            <button
                                                onClick={
                                                    handleAcceptRequest
                                                }
                                                disabled={actionLoading}
                                                className="
                                                    cursor-pointer
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-gradient-to-r
                                                    from-blue-600
                                                    to-indigo-600
                                                    px-5
                                                    py-2.5
                                                    text-sm
                                                    font-semibold
                                                    text-white
                                                    shadow-lg
                                                    shadow-blue-500/20
                                                    transition-all
                                                    duration-200
                                                    hover:-translate-y-0.5
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                                            >

                                                {actionLoading
                                                    ? "Processing..."
                                                    : "Accept"
                                                }

                                            </button>


                                            <button
                                                onClick={
                                                    handleRejectRequest
                                                }
                                                disabled={actionLoading}
                                                className="
                                                    cursor-pointer
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    border
                                                    border-slate-200
                                                    bg-slate-100
                                                    px-5
                                                    py-2.5
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                    transition-all
                                                    duration-200
                                                    hover:bg-slate-200
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                    dark:border-slate-700
                                                    dark:bg-slate-800
                                                    dark:text-slate-200
                                                    dark:hover:bg-slate-700
                                                "
                                            >

                                                Reject

                                            </button>

                                        </>

                                    ) : (

                                        <button
                                            disabled
                                            className="
                                                inline-flex
                                                cursor-not-allowed
                                                items-center
                                                justify-center
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-100
                                                px-5
                                                py-2.5
                                                text-sm
                                                font-semibold
                                                text-slate-500
                                                dark:border-slate-700
                                                dark:bg-slate-800
                                                dark:text-slate-400
                                            "
                                        >
                                            Request Sent
                                        </button>

                                    )}

                                </div>

                            )}


                            {/* ACCEPTED */}

                            {connectionStatus === "accepted" && (

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-2
                                ">

                                    <ChatWithUserButton
                                        userId={profile._id}
                                    />

                                    <button
                                        onClick={
                                            handleRemoveConnection
                                        }
                                        disabled={
                                            actionLoading ||
                                            !acceptedConnection?._id
                                        }
                                        className="
                                            cursor-pointer
                                            inline-flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-red-200
                                            bg-red-50
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-red-600
                                            transition-all
                                            duration-200
                                            hover:bg-red-100
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            dark:border-red-900/50
                                            dark:bg-red-950/30
                                            dark:text-red-400
                                            dark:hover:bg-red-950/50
                                        "
                                    >

                                        {actionLoading
                                            ? "Removing..."
                                            : "Remove Connection"
                                        }

                                    </button>

                                </div>

                            )}

                        </div>

                    </section>

                )}


                {/* =================================================
                    PRIVATE PROFILE
                ================================================= */}

                {connectionStatus !== "accepted" &&
                    !isOwnProfile && (

                        <section className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        text-center
                        shadow-sm
                        dark:border-slate-800
                        dark:bg-slate-900
                    ">

                            <div className="
                            mx-auto
                            mb-5
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-50
                            to-indigo-100
                            text-2xl
                            dark:from-blue-950/50
                            dark:to-indigo-950/50
                        ">
                                🔒
                            </div>

                            <h2 className="
                            text-xl
                            font-bold
                            text-slate-900
                            dark:text-white
                        ">
                                This profile is private
                            </h2>

                            <p className="
                            mx-auto
                            mt-2
                            max-w-md
                            text-sm
                            leading-6
                            text-slate-500
                            dark:text-slate-400
                        ">
                                Connect with {profile.name} to see
                                their profile information and posts.
                            </p>

                        </section>

                    )}


                {/* =================================================
                    FULL PROFILE
                    ONLY WHEN ACCEPTED
                ================================================= */}

                {connectionStatus === "accepted" && (

                    <div className="space-y-5 sm:space-y-6">


                        {/* CONNECTIONS */}

                        <div className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            shadow-slate-900/5
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <ProfileConnections
                                profile={profile}
                            />

                        </div>


                        {/* ABOUT */}

                        <div className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            shadow-slate-900/5
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <AboutSection
                                bio={profile.bio}
                            />

                        </div>


                        {/* SKILLS */}

                        <div className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            shadow-slate-900/5
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <SkillsSection
                                skills={profile.skills}
                            />

                        </div>


                        {/* EDUCATION */}

                        <div className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            shadow-slate-900/5
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <EducationSection
                                education={profile.education}
                            />

                        </div>


                        {/* EXPERIENCE */}

                        <div className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            shadow-slate-900/5
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <ExperienceSection
                                experience={profile.experience}
                            />

                        </div>


                        {/* =================================================
                            USER POSTS
                        ================================================= */}

                        <section className="space-y-4">

                            {/* POSTS HEADER */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                px-5
                                py-4
                                shadow-sm
                                shadow-slate-900/5
                                dark:border-slate-800
                                dark:bg-slate-900
                            ">

                                <div>

                                    <p className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-widest
                                        text-blue-600
                                        dark:text-blue-400
                                    ">
                                        Activity
                                    </p>

                                    <h2 className="
                                        mt-1
                                        text-xl
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    ">
                                        Posts
                                    </h2>

                                </div>

                                <span className="
                                    rounded-full
                                    bg-blue-50
                                    px-3
                                    py-1
                                    text-sm
                                    font-semibold
                                    text-blue-600
                                    dark:bg-blue-950/50
                                    dark:text-blue-400
                                ">
                                    {profile.postsCount || 0}
                                </span>

                            </div>


                            {/* NO POSTS */}

                            {!postLoading &&
                                posts.length === 0 && (

                                    <div className="
                                    rounded-3xl
                                    border
                                    border-dashed
                                    border-slate-300
                                    bg-white
                                    px-6
                                    py-12
                                    text-center
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                ">

                                        <div className="
                                        mx-auto
                                        mb-4
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-slate-100
                                        text-xl
                                        dark:bg-slate-800
                                    ">
                                            📝
                                        </div>

                                        <h3 className="
                                        font-semibold
                                        text-slate-800
                                        dark:text-slate-200
                                    ">
                                            No posts yet
                                        </h3>

                                        <p className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    ">
                                            {profile.name} hasn't shared
                                            any posts yet.
                                        </p>

                                    </div>

                                )}


                            {/* POSTS */}

                            {posts.map((post) => (

                                <div
                                    key={post._id}
                                    className="
                                        overflow-hidden
                                        rounded-3xl
                                        border
                                        border-slate-200
                                        bg-white
                                        shadow-sm
                                        shadow-slate-900/5
                                        transition-all
                                        duration-300
                                        hover:shadow-md
                                        dark:border-slate-800
                                        dark:bg-slate-900
                                    "
                                >

                                    <PostCard
                                        post={post}
                                    />

                                </div>

                            ))}


                            {/* LOADING */}

                            {postLoading && (

                                <div className="
                                    flex
                                    justify-center
                                    py-6
                                ">
                                    <Loader />
                                </div>

                            )}


                            {/* No more posts */}
                            {!hasMorePosts && posts.length > 0 && (
                                <div className="py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                                        <span
                                            className="
                                        shrink-0 rounded-full
                                        border border-slate-200
                                        bg-white px-4 py-2
                                        text-xs font-medium
                                        text-slate-500
                                        shadow-sm
                                        dark:border-slate-800
                                        dark:bg-slate-900
                                        dark:text-slate-400
                                    "
                                        >
                                            No more posts
                                        </span>

                                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                </div>
                            )}

                        </section>

                    </div>

                )}

            </div>

        </div>

    );

};


export default UserProfile;