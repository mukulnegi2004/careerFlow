const Loader = () => {
    return (
        <div className="flex items-center justify-center py-8">
            <div
                className="
                    h-10 w-10 animate-spin rounded-full
                    border-4 border-blue-600
                    border-t-transparent
                    dark:border-blue-400
                    dark:border-t-transparent
                "
            ></div>
        </div>
    );
};

export default Loader;
