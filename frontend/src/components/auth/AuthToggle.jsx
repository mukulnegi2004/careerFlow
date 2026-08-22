const AuthToggle = ({ isLogin, setIsLogin }) => {
    return (
      <div className="mt-6 text-center">
        {isLogin ? (                                                    //if trying login, show register button
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        ) : (                                                          //if trying register, show login button
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    );
  };
  
  export default AuthToggle;