const Error = ({ message = "Something went wrong. Please try again." }) => {
    return (
        <div className="bg-white border border-red-200 rounded-xl shadow-sm p-6 text-center">
            
            <div className="text-3xl mb-2">
                ⚠️
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
                Something went wrong
            </h2>

            <p className="text-sm text-red-600 mt-1">
                {message}
            </p>

        </div>
    );
};

export default Error;