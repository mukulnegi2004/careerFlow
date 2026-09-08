const PostBody = ({ post }) => {
    return (
        <div className="px-4 pb-4">

            {/* Post Content */}
            {post.content && (
                <p
                    className="
                        mb-4 whitespace-pre-line
                        leading-7 text-slate-800
                        dark:text-slate-200
                    "
                >
                    {post.content}
                </p>
            )}

            {/* Post Image */}
            {post.image && (
                <div
                    className="
                        overflow-hidden rounded-xl
                        border border-slate-200
                        bg-slate-100
                        dark:border-slate-700
                        dark:bg-slate-800
                    "
                >
                    <img
                        src={post.image}
                        alt="Post"
                        className="
                            max-h-[600px] w-full
                            rounded-xl object-contain
                        "
                    />
                </div>
            )}
        </div>
    );
};

export default PostBody;
