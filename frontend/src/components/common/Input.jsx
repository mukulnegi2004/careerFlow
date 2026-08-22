const Input = ({
  label,                                                            //Text shown above input
  type = "text",                                                    //Input type (text, email, password)
  placeholder,                                                      //Hint inside input
  register,                                                         //React Hook Form function
  name,                                                             //Field name
  validation = {},                                                  //Validation rules
  error,                                                           //Error object from React Hook Form
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}        //tells to react-hook-form, This input belongs to the form. Please track its value and validate it.
        className={`w-full px-4 py-2 border rounded-lg outline-none transition
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;