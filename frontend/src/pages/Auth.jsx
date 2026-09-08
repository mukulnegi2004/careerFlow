import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectIsAuthenticated } from "../features/auth/authSelectors";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import AuthToggle from "../components/auth/AuthToggle";
import ThemeToggle from "../components/common/ThemeToggle";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div className="min-h-screen grid lg:grid-cols-2">

        {/* Left Section */}
        <div className="hidden lg:flex relative overflow-hidden flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white p-10">

          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 max-w-lg text-center">
            <h1 className="text-6xl font-extrabold tracking-tight">
              Career<span className="text-blue-200">Flow</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Connect with professionals, showcase your achievements,
              discover opportunities, and grow your career.
            </p>

            <div className="mt-10 flex justify-center gap-3 flex-wrap">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                🚀 Career Growth
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                🤝 Networking
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                💡 Opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex min-h-screen items-center justify-center px-5 py-16 sm:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

          <div className="w-full max-w-md">

            {/* Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-9 transition-colors duration-300">

              {/* Logo */}
              <div className="mb-7 text-center">

                <div className="mb-4 flex justify-center">
                  <img
                    src="/logo.png"
                    alt="CareerFlow Logo"
                    className="h-12 object-contain"
                  />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {isLogin
                    ? "Login to continue your career journey"
                    : "Start building your professional network"}
                </p>
              </div>

              {/* Form */}
              {isLogin ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}

              {/* Login/Register Toggle */}
              <AuthToggle
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />

            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
              © {new Date().getFullYear()} CareerFlow. Build your future.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;