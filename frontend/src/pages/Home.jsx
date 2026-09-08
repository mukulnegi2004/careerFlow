import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllFeed } from "../features/feed/feedAPI";

import {
    selectFeedPosts,
    selectFeedPage,
    selectFeedLoading,
    selectFeedHasMore,
    selectFeedError,
} from "../features/feed/feedSelectors";

import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import Loader from "../components/common/Loader";
import Error from "../components/common/Error";

const Home = () => {
    const [showCreatePost, setShowCreatePost] = useState(false);

    const dispatch = useDispatch();

    const posts = useSelector(selectFeedPosts);
    const currentPage = useSelector(selectFeedPage);
    const loading = useSelector(selectFeedLoading);
    const hasMore = useSelector(selectFeedHasMore);
    const error = useSelector(selectFeedError);

    const LIMIT = 5;

    // Fetch first page
    useEffect(() => {
        dispatch(
            fetchAllFeed({
                page: 1,
                limit: LIMIT,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            if (loading) return;
            if (!hasMore) return;

            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= pageHeight - 100) {
                dispatch(
                    fetchAllFeed({
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
    }, [dispatch, currentPage, loading, hasMore]);

    return (
        <div className="mx-auto w-full max-w-4xl space-y-5 px-4 py-6 sm:px-6">

            {/* Create Post Trigger */}
            {!showCreatePost && (
                <button
                    onClick={() => setShowCreatePost(true)}
                    className="
                        w-full rounded-2xl border border-slate-200
                        bg-white p-4 text-left shadow-sm
                        transition-all duration-200
                        hover:border-blue-200 hover:bg-slate-50
                        hover:shadow-md
                        dark:border-slate-800
                        dark:bg-slate-900
                        dark:hover:border-slate-700
                        dark:hover:bg-slate-800
                        cursor-pointer
                    "
                >
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        What do you want to share?
                    </span>
                </button>
            )}

            {/* Create Post */}
            {showCreatePost && (
                <CreatePost
                    onClose={() => setShowCreatePost(false)}
                />
            )}

            {/* Feed Header */}
            <div
                className="
                    rounded-2xl border border-slate-200
                    bg-white px-5 py-4 shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Your Feed
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Posts from people you're connected with
                </p>
            </div>

            {/* Error */}
            {error && <Error message={error} />}

            {/* Empty Feed */}
            {!loading && posts.length === 0 && !error && (
                <div
                    className="
                        rounded-2xl border border-slate-200
                        bg-white p-10 text-center shadow-sm
                        dark:border-slate-800
                        dark:bg-slate-900
                    "
                >
                    <div className="mb-3 text-4xl">🌱</div>

                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                        Your feed is empty
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Connect with people to see their posts here.
                    </p>
                </div>
            )}

            {/* Posts */}
            <section className="space-y-4">
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}
            </section>

            {/* Loading */}
            {loading && <Loader />}

            {/* No More Posts */}
            {!hasMore && posts.length > 0 && (
                <div className="py-5 text-center text-sm text-slate-500 dark:text-slate-400">
                    You've reached the end of your feed
                </div>
            )}
        </div>
    );
};

export default Home;
