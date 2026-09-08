const Error = ({
    message = "Something went wrong. Please try again.",
}) => {
    return (
        <div
            className="
                rounded-2xl border border-red-200
                bg-white p-6 text-center shadow-sm
                dark:border-red-900/50
                dark:bg-slate-900
            "
        >
            <div className="mb-2 text-3xl">
                ⚠️
            </div>

            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Something went wrong
            </h2>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {message}
            </p>
        </div>
    );
};

export default Error;
