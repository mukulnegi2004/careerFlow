const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <div className="mt-7 text-center">
      {isLogin ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="cursor-pointer font-semibold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Register
          </button>
        </p>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="cursor-pointer font-semibold text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Login
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthToggle;