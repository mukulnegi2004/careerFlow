import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
        return <Loader />;
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (
            <div className="flex justify-center py-20">
                <h2 className="text-xl font-semibold text-red-500">
                    {error}
                </h2>
            </div>
        );

    }


    // =========================================================
    // PROFILE NOT FOUND
    // =========================================================

    if (!profile) {

        return (
            <div className="flex justify-center py-20">
                <h2 className="text-xl font-semibold">
                    User not found
                </h2>
            </div>
        );

    }


    return (

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">


            {/* USER PROFILE HEADER */}

            <UserProfileHeader
                profile={profile}
            />


            {/* CONNECTION BUTTONS */}

            {!isOwnProfile && (

                <section className="bg-white rounded-xl shadow p-5">

                    {/* NO CONNECTION */}

                    {connectionStatus === "none" && (

                        <button
                            onClick={handleSendRequest}
                            disabled={actionLoading}
                            className="
                                px-5
                                py-2
                                bg-blue-600
                                text-white
                                rounded-lg
                                hover:bg-blue-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
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

                        <>
                            {incomingRequest ? (

                                <div className="flex gap-3">

                                    <button
                                        onClick={
                                            handleAcceptRequest
                                        }
                                        disabled={actionLoading}
                                        className="
                                            px-5
                                            py-2
                                            bg-blue-600
                                            text-white
                                            rounded-lg
                                            hover:bg-blue-700
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
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
                                            px-5
                                            py-2
                                            bg-gray-200
                                            text-gray-700
                                            rounded-lg
                                            hover:bg-gray-300
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                        "
                                    >

                                        Reject

                                    </button>

                                </div>

                            ) : (

                                <button
                                    disabled
                                    className="
                                        px-5
                                        py-2
                                        bg-gray-400
                                        text-white
                                        rounded-lg
                                        cursor-not-allowed
                                    "
                                >

                                    Request Sent

                                </button>

                            )}

                        </>

                    )}


                    {/* ACCEPTED */}

                    {connectionStatus === "accepted" && (

                        <div className="flex gap-3">

                            {/* CHAT BUTTON */}
                            <ChatWithUserButton
                                userId={profile._id}
                            />

                            {/* REMOVE CONNECTION */}
                            <button
                                onClick={handleRemoveConnection}
                                disabled={
                                    actionLoading ||
                                    !acceptedConnection?._id
                                }
                                className="
            px-5
            py-2
            bg-red-500
            text-white
            rounded-lg
            hover:bg-red-600
            disabled:opacity-50
            disabled:cursor-not-allowed
        "
                            >
                                {actionLoading
                                    ? "Removing..."
                                    : "Remove Connection"
                                }
                            </button>

                        </div>

                    )}

                </section>

            )}


            {/* FULL PROFILE + POSTS
                ONLY WHEN ACCEPTED */}

            {connectionStatus === "accepted" && (

                <>

                    <ProfileConnections
                        profile={profile}
                    />


                    <AboutSection
                        bio={profile.bio}
                    />


                    <SkillsSection
                        skills={profile.skills}
                    />


                    <EducationSection
                        education={profile.education}
                    />


                    <ExperienceSection
                        experience={profile.experience}
                    />


                    {/* USER POSTS */}

                    <section className="space-y-4">

                        <div className="bg-white rounded-xl shadow p-5">

                            <h2 className="text-xl font-semibold">
                                Posts ({profile.postsCount || 0})
                            </h2>

                        </div>


                        {/* NO POSTS */}

                        {!postLoading &&
                            posts.length === 0 && (

                                <div className="
                                    bg-white
                                    rounded-xl
                                    shadow
                                    p-8
                                    text-center
                                    text-gray-500
                                ">
                                    No posts yet.
                                </div>

                            )
                        }


                        {/* POSTS */}

                        {posts.map((post) => (

                            <PostCard
                                key={post._id}
                                post={post}
                            />

                        ))}


                        {/* LOADING */}

                        {postLoading && (
                            <Loader />
                        )}


                        {/* NO MORE POSTS */}

                        {!hasMorePosts &&
                            posts.length > 0 && (

                                <div className="
                                    text-center
                                    py-4
                                    text-gray-500
                                ">
                                    No more posts
                                </div>

                            )
                        }

                    </section>

                </>

            )}

        </div>

    );

};


export default UserProfile;