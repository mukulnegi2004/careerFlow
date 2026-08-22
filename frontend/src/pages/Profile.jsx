import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserPosts } from "../features/post/postAPI";
import { fetchCurrentUser } from "../features/auth/authAPI";

import { selectUser, selectLoading } from "../features/auth/authSelectors";

import {
    selectUserPosts,
    selectUserPostsPage,
    selectUserPostsLoading,
    selectHasMoreUserPosts,
} from "../features/post/postSelectors";

import ProfileHeader from "../components/profile/ProfileHeader";
import AboutSection from "../components/profile/AboutSection";
import SkillsSection from "../components/profile/SkillsSection";
import EducationSection from "../components/profile/EducationSection";
import ExperienceSection from "../components/profile/ExperienceSection";
import ProfileConnections from "../components/profile/ProfileConnections";

import PostCard from "../components/post/PostCard";
import Loader from "../components/common/Loader";


const Profile = () => {

    const dispatch = useDispatch();

    const profile = useSelector(selectUser);

    // User posts
    const posts = useSelector(selectUserPosts);
    const currentPage = useSelector(selectUserPostsPage);
    const postLoading = useSelector(selectUserPostsLoading);
    const hasMorePosts = useSelector(selectHasMoreUserPosts);

    const profileLoading = useSelector(selectLoading);

    const LIMIT = 5;


    useEffect(() => {

        dispatch(fetchCurrentUser());

    }, [dispatch]);


    // Fetch current user's posts
    useEffect(() => {

        if (!profile?._id) return;

        dispatch(
            fetchUserPosts({
                userId: profile._id,
                page: 1,
                limit: LIMIT,
            })
        );

    }, [dispatch, profile?._id]);


    // Load next page when user reaches bottom
    useEffect(() => {

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
                        limit: LIMIT,
                    })
                );
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [
        dispatch,
        profile?._id,
        currentPage,
        postLoading,
        hasMorePosts
    ]);


    if (profileLoading) {
        return <Loader />;
    }


    if (!profile) {
        return (
            <div className="flex justify-center py-20">
                <h2 className="text-xl font-semibold">
                    Profile not found
                </h2>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

            {/* Profile Header */}
            <ProfileHeader profile={profile} />

            {/* Profile connections */}
            <ProfileConnections profile={profile} />

            {/* About */}
            <AboutSection bio={profile.bio} />

            {/* Skills */}
            <SkillsSection skills={profile.skills} />

            {/* Education */}
            <EducationSection education={profile.education} />

            {/* Experience */}
            <ExperienceSection experience={profile.experience} />


            {/* User Posts */}
            <section className="space-y-4">

                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-semibold">
                        My Posts ({profile.postsCount})
                    </h2>
                </div>


                {/* No posts */}
                {!postLoading && posts.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        You haven't created any posts yet.
                    </div>
                )}


                {/* Posts */}
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}


                {/* Loading */}
                {postLoading && (
                    <Loader />
                )}


                {/* No more posts */}
                {!hasMorePosts && posts.length > 0 && (
                    <div className="text-center py-4 text-gray-500">
                        No more posts
                    </div>
                )}

            </section>

        </div>
    );
};


export default Profile;