import { createSlice } from "@reduxjs/toolkit";

//storing the theme mode in localStorage: "light" or "dark", If mode is "dark" → add dark class to <html>, If mode is "light" → remove dark class from <html>

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("careerflow-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";

      localStorage.setItem("careerflow-theme", state.mode);

      //Add "dark" class to <html> root element when theme is dark; remove it when light, so if condition true -> add "dark", if false -> remove "dark"
      document.documentElement.classList.toggle("dark", state.mode === "dark"); 
    }
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;