import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { fetchImprovedPost } from "../../features/ai/aiAPI";
import { clearImprovedPost, clearAIError } from "../../features/ai/aiSlice";
import { selectImprovedPost, selectAILoading, selectAIError } from "../../features/ai/aiSelectors";

import { addPost } from "../../features/post/postAPI";
import { clearPostError } from "../../features/post/postSlice";
import { selectAddPostLoading, selectPostError } from "../../features/post/postSelectors";


function CreatePost({ onClose }) {

    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const improvedPost = useSelector(selectImprovedPost);
    const aiLoading = useSelector(selectAILoading);
    const aiError = useSelector(selectAIError);

    const postLoading = useSelector(selectAddPostLoading);
    const postError = useSelector(selectPostError);

    useEffect(() => {

        dispatch(clearImprovedPost());
        dispatch(clearAIError());
        dispatch(clearPostError());

        return () => {
            dispatch(clearImprovedPost());
            dispatch(clearAIError());
            dispatch(clearPostError());
        };

    }, [dispatch]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);

        setPreviewImage(URL.createObjectURL(file));
    };

    const handleImprovePost = () => {
        if (!content.trim()) {
            return;
        }

        dispatch(fetchImprovedPost(content));
    };

    const handleAddAIContent = () => {
        if (!improvedPost) return;

        setContent(improvedPost);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        const formData = new FormData();

        formData.append(
            "content",
            content
        );

        if(image) {
            formData.append(
                "image",
                image
            );
        }

        const result = await dispatch(
            addPost(formData)
        );

        if (addPost.fulfilled.match(result)) {
            setContent("");
            setImage(null);
            setPreviewImage(null);
            dispatch(clearImprovedPost());
            
            onClose();

            toast.success("Post uploaded successfully!");
        }
    };

    const handleClose = () => {
        setContent("");
        setImage(null);
        setPreviewImage(null);
        dispatch(clearImprovedPost());
        dispatch(clearAIError());

        onClose();
    };


    return (

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">


            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Create a post</h2>

                <button type="button" onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer">
                    ✕
                </button>
            </div>


            <form onSubmit={handleSubmit}>
                {/* Content */}
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What do you want to share?"
                    rows={5}
                    className="w-full border border-gray-200 rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                />


                {/* AI error */}
                {aiError && (
                    <p className="text-sm text-red-500 mt-2">{aiError}</p>
                )}


                {/* AI generated content */}
                {improvedPost && (
                    <div className="mt-4 border border-purple-200 bg-purple-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-purple-700">✨ AI suggestion</h3>
                        </div>


                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{improvedPost}</p>


                        <button type="button" onClick={handleAddAIContent}
                            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                        >Add AI Content</button>
                    </div>
                )}


                {/* Image preview */}
                {previewImage && (
                    <div className="mt-4 relative bg-gray-100 rounded-lg p-2">
                        <img src={previewImage} alt="Preview" className="w-full max-h-80 object-contain rounded-lg"/>

                        <button type="button"
                            onClick={() => {
                                setImage(null);
                                setPreviewImage(null);
                            }}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                )}


                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                    {/* Left actions */}
                    <div className="flex gap-2">
                        {/* Image */}
                        <label className="cursor-pointer px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100">
                            📷 Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        {/* AI */}
                        <button
                            type="button"
                            onClick={handleImprovePost}
                            disabled={
                                !content.trim() ||
                                aiLoading
                            }
                            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50 cursor-pointer"
                        >
                            {aiLoading ? "✨ Improving..." : "✨ Get AI Content"}
                        </button>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                        disabled={
                            !content.trim() ||
                            postLoading
                        }
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                        {postLoading ? "Posting..." : "Post"}
                    </button>
                </div>

                {/* Post error */}
                {postError && (
                    <p className="text-sm text-red-500 mt-3">{postError}</p>
                )}
            </form>
        </div>
    );
}


export default CreatePost;