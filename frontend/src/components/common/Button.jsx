const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        cursor-pointer
        w-full
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        py-3
        font-semibold
        text-white
        shadow-lg
        shadow-blue-500/20
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:from-blue-700
        hover:to-indigo-700
        hover:shadow-xl
        hover:shadow-blue-500/25

        active:translate-y-0

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0

        dark:from-blue-500
        dark:to-indigo-500
        dark:hover:from-blue-600
        dark:hover:to-indigo-600

        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;