import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { fetchImprovedPost } from "../../features/ai/aiAPI";
import {
    clearImprovedPost,
    clearAIError,
} from "../../features/ai/aiSlice";
import {
    selectImprovedPost,
    selectAILoading,
    selectAIError,
} from "../../features/ai/aiSelectors";

import { addPost } from "../../features/post/postAPI";
import { clearPostError } from "../../features/post/postSlice";
import {
    selectAddPostLoading,
    selectPostError,
} from "../../features/post/postSelectors";

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

        if (image) {
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
        <div
            className="
                rounded-2xl
                border border-slate-200
                bg-white p-5 shadow-sm
                transition-colors duration-300
                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Create a post
                </h2>

                <button
                    type="button"
                    onClick={handleClose}
                    className="
                        cursor-pointer rounded-lg
                        px-2 py-1 text-lg
                        text-slate-500
                        transition-colors
                        hover:bg-slate-100
                        hover:text-slate-800
                        dark:text-slate-400
                        dark:hover:bg-slate-800
                        dark:hover:text-slate-100
                    "
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Content */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What do you want to share?"
                    rows={5}
                    className="
                        w-full resize-none rounded-xl
                        border border-slate-200
                        bg-slate-50 p-3
                        text-slate-800
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                        dark:border-slate-700
                        dark:bg-slate-950
                        dark:text-slate-100
                        dark:placeholder:text-slate-500
                    "
                />

                {/* AI Error */}
                {aiError && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                        {aiError}
                    </p>
                )}

                {/* AI Generated Content */}
                {improvedPost && (
                    <div
                        className="
                            mt-4 rounded-xl
                            border border-violet-200
                            bg-violet-50 p-4
                            dark:border-violet-900/50
                            dark:bg-violet-950/30
                        "
                    >
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-semibold text-violet-700 dark:text-violet-300">
                                ✨ AI suggestion
                            </h3>
                        </div>

                        <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                            {improvedPost}
                        </p>

                        <button
                            type="button"
                            onClick={handleAddAIContent}
                            className="
                                mt-3 cursor-pointer
                                rounded-xl bg-violet-600
                                px-4 py-2
                                font-medium text-white
                                transition-colors
                                hover:bg-violet-700
                            "
                        >
                            Add AI Content
                        </button>
                    </div>
                )}

                {/* Image Preview */}
                {previewImage && (
                    <div
                        className="
                            relative mt-4 rounded-xl
                            bg-slate-100 p-2
                            dark:bg-slate-800
                        "
                    >
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="
                                max-h-80 w-full
                                rounded-lg object-contain
                            "
                        />

                        <button
                            type="button"
                            onClick={() => {
                                setImage(null);
                                setPreviewImage(null);
                            }}
                            className="
                                absolute right-3 top-3
                                flex h-8 w-8
                                cursor-pointer
                                items-center justify-center
                                rounded-full
                                bg-slate-900/70
                                text-white
                                transition-colors
                                hover:bg-red-600
                            "
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                    {/* Left Actions */}
                    <div className="flex flex-wrap gap-2">

                        {/* Image */}
                        <label
                            className="
                                cursor-pointer
                                rounded-xl
                                border border-slate-200
                                bg-white px-4 py-2
                                font-medium text-slate-600
                                transition-colors
                                hover:bg-slate-100
                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:text-slate-300
                                dark:hover:bg-slate-700
                            "
                        >
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
                            className="
                                cursor-pointer
                                rounded-xl
                                bg-violet-100
                                px-4 py-2
                                font-medium text-violet-700
                                transition-colors
                                hover:bg-violet-200
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                dark:bg-violet-950/50
                                dark:text-violet-300
                                dark:hover:bg-violet-900/50
                            "
                        >
                            {aiLoading
                                ? "✨ Improving..."
                                : "✨ Get AI Content"}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={
                            !content.trim() ||
                            postLoading
                        }
                        className="
                            cursor-pointer rounded-xl
                            bg-gradient-to-r
                            from-blue-600 to-indigo-600
                            px-5 py-2
                            font-semibold text-white
                            shadow-sm
                            transition-all duration-200
                            hover:from-blue-700
                            hover:to-indigo-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {postLoading
                            ? "Posting..."
                            : "Post"}
                    </button>
                </div>

                {/* Post Error */}
                {postError && (
                    <p className="mt-3 text-sm text-red-500 dark:text-red-400">
                        {postError}
                    </p>
                )}
            </form>
        </div>
    );
}

export default CreatePost;
