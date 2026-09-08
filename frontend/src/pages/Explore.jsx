import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllPosts } from "../features/post/postAPI";
import {
    selectPosts,
    selectPostsPage,
    selectPostsLoading,
    selectHasMorePosts,
    selectPostError,
} from "../features/post/postSelectors";

import PostCard from "../components/post/PostCard";
import Loader from "../components/common/Loader";
import Error from "../components/common/Error";

function Explore() {
    const dispatch = useDispatch();

    const posts = useSelector(selectPosts);
    const currentPage = useSelector(selectPostsPage);
    const loading = useSelector(selectPostsLoading);
    const hasMore = useSelector(selectHasMorePosts);
    const error = useSelector(selectPostError);

    const LIMIT = 5;

    useEffect(() => {
        dispatch(
            fetchAllPosts({
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
                    fetchAllPosts({
                        page: currentPage + 1,
                        limit: LIMIT,
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
    }, [dispatch, currentPage, loading, hasMore]);

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 sm:py-6">

            {/* Header */}
            <div
                className="
                    mb-5 overflow-hidden rounded-2xl
                    border border-slate-200
                    bg-white
                    shadow-sm
                    transition-colors duration-300
                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >
                <div className="relative px-5 py-5 sm:px-6">

                    {/* Accent */}
                    <div
                        className="
                            absolute left-0 top-0 h-full w-1
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
                                    flex h-10 w-10 items-center justify-center
                                    rounded-xl
                                    bg-blue-50
                                    text-lg
                                    transition-colors duration-300
                                    dark:bg-blue-950/50
                                "
                            >
                                🔎
                            </div>

                            <div>
                                <h1
                                    className="
                                        text-xl font-bold
                                        tracking-tight
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Explore
                                </h1>

                                <p
                                    className="
                                        mt-0.5 text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    Discover posts from the CareerFlow community
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5">
                    <Error message={error} />
                </div>
            )}

            {/* Empty State */}
            {!loading &&
                posts.length === 0 &&
                !error && (
                    <div
                        className="
                            rounded-2xl
                            border border-slate-200
                            bg-white
                            px-6 py-12
                            text-center
                            shadow-sm
                            transition-colors duration-300
                            dark:border-slate-800
                            dark:bg-slate-900
                        "
                    >
                        <div
                            className="
                                mx-auto mb-4
                                flex h-16 w-16
                                items-center justify-center
                                rounded-2xl
                                bg-slate-100
                                text-3xl
                                transition-colors duration-300
                                dark:bg-slate-800
                            "
                        >
                            🔎
                        </div>

                        <h3
                            className="
                                text-lg font-semibold
                                text-slate-800
                                dark:text-slate-100
                            "
                        >
                            No posts found
                        </h3>

                        <p
                            className="
                                mx-auto mt-1 max-w-sm
                                text-sm leading-6
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            There are no posts to explore right now.
                            Check back later for new content.
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

            {/* Loader */}
            {loading && (
                <div
                    className="
                        flex justify-center
                        py-6
                    "
                >
                        <Loader />
                </div>
            )}

            {/* End of Posts */}
            {!hasMore && posts.length > 0 && (
                <div className="py-8">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                        <span
                            className="
                                shrink-0 rounded-full
                                border border-slate-200
                                bg-white
                                px-4 py-2
                                text-xs font-medium
                                text-slate-500
                                shadow-sm
                                transition-colors duration-300
                                dark:border-slate-800
                                dark:bg-slate-900
                                dark:text-slate-400
                            "
                        >
                            You've reached the end of Explore.
                        </span>

                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Explore;