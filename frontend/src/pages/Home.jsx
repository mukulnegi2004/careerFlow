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
                    fetchAllFeed({ page: currentPage + 1, limit: LIMIT, })
                );
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [dispatch, currentPage, loading, hasMore,]);


    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

            {/* Create Post */}
            {!showCreatePost && (
                <button onClick={() => setShowCreatePost(true)}
                    className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:bg-gray-50 cursor-pointer">

                    <span className="text-gray-500">What do you want to share?</span>

                </button>
            )}


            {showCreatePost && (
                <CreatePost onClose={() => setShowCreatePost(false)}/>
            )}


            {/* Feed Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">

                <h2 className="text-xl font-semibold text-gray-800">
                    Your Feed
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Posts from people you're connected with
                </p>

            </div>


            {/* Error */}
            {error && (<Error message={error} />)}


            {/* Empty Feed */}
            {!loading && posts.length === 0 && !error && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">

                    <div className="text-4xl mb-3">🌱</div>

                    <h3 className="text-lg font-semibold text-gray-700">Your feed is empty</h3>

                    <p className="text-sm text-gray-500 mt-1">Connect with people to see their posts here.</p>

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
            {loading && (<Loader />)}


            {/* No More Posts */}
            {!hasMore && posts.length > 0 && (
                <div className="text-center py-5 text-sm text-gray-500">
                    You've reached the end of your feed
                </div>
            )}

        </div>
    );
};


export default Home;