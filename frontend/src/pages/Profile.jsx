import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserPosts } from "../features/post/postAPI";
import { fetchCurrentUser } from "../features/auth/authAPI";

import {
    selectUser,
    selectLoading,
} from "../features/auth/authSelectors";

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

import ThemeToggle from "../components/common/ThemeToggle";

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
        hasMorePosts,
    ]);

    if (profileLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-4">
                <div
                    className="
                        w-full max-w-md rounded-2xl
                        border border-slate-200
                        bg-white p-8 text-center
                        shadow-sm
                        transition-colors duration-300
                        dark:border-slate-800
                        dark:bg-slate-900
                    "
                >
                    <div
                        className="
                            mx-auto mb-4 flex h-14 w-14
                            items-center justify-center
                            rounded-2xl
                            bg-slate-100
                            text-2xl
                            dark:bg-slate-800
                        "
                    >
                        👤
                    </div>

                    <h2
                        className="
                            text-xl font-bold
                            text-slate-800
                            dark:text-slate-100
                        "
                    >
                        Profile not found
                    </h2>

                    <p
                        className="
                            mt-2 text-sm
                            text-slate-500
                            dark:text-slate-400
                        "
                    >
                        We couldn't load your profile right now.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="
                mx-auto w-full max-w-4xl
                px-4 py-5
                sm:px-6 sm:py-6
            "
        >
            {/* Page Controls */}
            <div className="mb-4 flex items-center justify-end">
                <div
                    className="
                        rounded-xl
                        border border-slate-200
                        bg-white p-1
                        shadow-sm
                        transition-colors duration-300
                        dark:border-slate-800
                        dark:bg-slate-900
                    "
                >
                    <ThemeToggle />
                </div>
            </div>

            {/* Profile Header */}
            <div className="space-y-5">
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
                <ExperienceSection
                    experience={profile.experience}
                />

                {/* User Posts */}
                <section className="space-y-4">

                    {/* Posts Header */}
                    <div
                        className="
                            overflow-hidden rounded-2xl
                            border border-slate-200
                            bg-white
                            shadow-sm
                            transition-colors duration-300
                            dark:border-slate-800
                            dark:bg-slate-900
                        "
                    >
                        <div className="relative px-5 py-5 sm:px-6">
                            <div
                                className="
                                    absolute left-0 top-0
                                    h-full w-1
                                    bg-gradient-to-b
                                    from-blue-600
                                    via-indigo-600
                                    to-violet-600
                                "
                            />

                            <div className="pl-1">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex h-10 w-10
                                            shrink-0 items-center
                                            justify-center
                                            rounded-xl
                                            bg-blue-50
                                            text-lg
                                            dark:bg-blue-950/50
                                        "
                                    >
                                        📝
                                    </div>

                                    <div>
                                        <h2
                                            className="
                                                text-lg font-bold
                                                text-slate-900
                                                dark:text-white
                                            "
                                        >
                                            My Posts
                                        </h2>

                                        <p
                                            className="
                                                mt-0.5 text-sm
                                                text-slate-500
                                                dark:text-slate-400
                                            "
                                        >
                                            {profile.postsCount || 0}{" "}
                                            {profile.postsCount === 1
                                                ? "post"
                                                : "posts"}{" "}
                                            shared with the community
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* No posts */}
                    {!postLoading && posts.length === 0 && (
                        <div
                            className="
                                rounded-2xl
                                border border-slate-200
                                bg-white
                                p-10 text-center
                                shadow-sm
                                transition-colors duration-300
                                dark:border-slate-800
                                dark:bg-slate-900
                            "
                        >
                            <div
                                className="
                                    mx-auto mb-4
                                    flex h-14 w-14
                                    items-center justify-center
                                    rounded-2xl
                                    bg-slate-100
                                    text-2xl
                                    dark:bg-slate-800
                                "
                            >
                                ✍️
                            </div>

                            <h3
                                className="
                                    text-lg font-semibold
                                    text-slate-800
                                    dark:text-slate-100
                                "
                            >
                                No posts yet
                            </h3>

                            <p
                                className="
                                    mt-1 text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                You haven't created any posts yet.
                            </p>
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
                        <div className="flex justify-center py-5">
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
        </div>
    );
};

export default Profile;