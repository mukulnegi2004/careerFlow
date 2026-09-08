const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  validation = {},
  error,
}) => {
  return (
    <div className="mb-5">

      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`
          w-full
          rounded-xl
          border
          bg-slate-50
          px-4
          py-3
          text-sm
          text-slate-900
          outline-none
          transition-all
          duration-200

          placeholder:text-slate-400

          /* Dark mode normal */
          dark:bg-slate-800
          dark:text-white
          dark:placeholder:text-slate-500

          /* Light mode focus */
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10

          /* Dark mode focus */
          dark:focus:border-blue-400
          dark:focus:ring-4
          dark:focus:ring-blue-400/15

          /* Error state */
          ${
            error
              ? `
                border-red-500
                focus:border-red-500
                focus:ring-red-500/10

                dark:border-red-500
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              `
              : `
                border-slate-200
                dark:border-slate-700
              `
          }
        `}
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
};

export default Input;
