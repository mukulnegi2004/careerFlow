const Button =({
    children,                                                               //Text/content inside button
    type = "button",                                                        //button type(submit, button)
    onClick,                                                              //Function when button is clicked
    disabled = false,                                                     //Manually disable button
    loading = false,                                                       //Show loading state
    className = ""                                                        //Extra Tailwind classes
}) => {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled || loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        >
            {loading? "please wait..." : children}
            
        </button>
    );
};


export default Button;