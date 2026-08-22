import { useEffect, useState } from "react";
import { useSelector } from "react-redux";                                                   //Reads data from the Redux store.
import { useNavigate } from "react-router-dom";

import {selectIsAuthenticated} from "../features/auth/authSelectors";                        //Imports the Redux selector

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import AuthToggle from "../components/auth/AuthToggle";                                     //toggle button

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);                         //isLogin = true means login form, false means register form

  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {                                
    if (isAuthenticated) {                           //if already logged in move to home page
      navigate("/", { replace: true });              //replaces the current entry in the browser's history instead of adding a new one, so after login user cant go back to login page by pressing the browser's Back button
    }
  }, [isAuthenticated]);                              //Run this effect when the component first mounts, and whenever isAuthenticated changes.

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-5xl font-bold">
          CareerFlow
        </h1>

        <p className="mt-4 max-w-md text-center">
          Connect with professionals, share your achievements,
          and grow your career.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
          <h2 className="mb-2 text-center text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mb-6 text-center text-gray-500">
            {isLogin
              ? "Login to continue"
              : "Create your CareerFlow account"}
          </p>

          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}

          <AuthToggle
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;