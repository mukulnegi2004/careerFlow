import { useDispatch, useSelector } from "react-redux";

import {
  selectIsDarkMode,
} from "../../features/theme/themeSelectors";

import {
  toggleTheme,
} from "../../features/theme/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  const isDark = useSelector(selectIsDarkMode);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        group
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        text-slate-600
        shadow-sm
        transition-all
        duration-300

        cursor-pointer

        hover:-translate-y-0.5
        hover:border-blue-300
        hover:text-blue-600
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:text-slate-300
        dark:hover:border-blue-500
        dark:hover:text-blue-400
      "
    >
      <span
        className={`
          absolute
          transition-all
          duration-300
          ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }
        `}
      >
        ☀️
      </span>

      <span
        className={`
          absolute
          transition-all
          duration-300
          ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }
        `}
      >
        🌙
      </span>
    </button>
  );
};

export default ThemeToggle;