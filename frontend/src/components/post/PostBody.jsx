const PostBody = ({ post }) => {

    return (

        <div className="px-4 pb-4">

            {/* Post Content */}
            {post.content && (
                <p className="text-gray-800 leading-7 whitespace-pre-line mb-4">
                    {post.content}
                </p>
            )}

            {/* Post Image */}
            {post.image && (
                <div className="rounded-xl overflow-hidden border bg-gray-100">
                    <img
                        src={post.image}
                        alt="Post"
                        className="w-full max-h-[600px] object-contain rounded-xl"
                    />
                </div>
            )}
        </div>

    );

};

export default PostBody;