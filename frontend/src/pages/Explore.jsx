import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllPosts } from "../features/post/postAPI";
import { selectPosts, selectPostsPage, selectPostsLoading, selectHasMorePosts, selectPostError} from "../features/post/postSelectors";

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
    }, [  dispatch,  currentPage,  loading,  hasMore]);


    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 mb-5">
                <h1 className="text-xl font-semibold text-gray-800">Explore</h1>

                <p className="text-sm text-gray-500 mt-1">Discover posts from the CareerFlow community</p>
            </div>

            {error && (
                <div className="mb-5">
                    <Error message={error} />
                </div>
            )}

            {!loading &&
                posts.length === 0 &&
                !error && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
                        <div className="text-4xl mb-3">🔎</div>

                        <h3 className="text-lg font-semibold text-gray-700">No posts found</h3>

                        <p className="text-sm text-gray-500 mt-1">There are no posts to explore right now.</p>
                    </div>
                )
            }

            <section className="space-y-4">
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}
            </section>

            {loading && (
                <div className="py-5">
                    <Loader />
                </div>
            )}

            {!hasMore &&
                posts.length > 0 && (
                    <div className="text-center py-6 text-sm text-gray-500">You've reached the end of Explore.</div>
                )
            }
        </div>
    );
}


export default Explore;