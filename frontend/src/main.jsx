import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "./styles/globals.css";
import store from "./app/store.js";

// Apply saved theme before rendering
const savedTheme = localStorage.getItem("careerflow-theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Adds a single toast container for the whole app
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,

          className: `
            !rounded-2xl
            !border
            !border-slate-200
            !bg-white
            !px-4
            !py-3
            !text-sm
            !font-medium
            !text-slate-800
            !shadow-xl
            !shadow-slate-900/10
            transition-colors
            duration-300

            dark:!border-slate-700
            dark:!bg-slate-900
            dark:!text-slate-100
            dark:!shadow-black/30
          `,

          success: {
            duration: 3000,

            className: `
              !rounded-2xl
              !border
              !border-emerald-200
              !bg-white
              !px-4
              !py-3
              !text-sm
              !font-medium
              !text-slate-800
              !shadow-xl
              !shadow-emerald-900/10

              dark:!border-emerald-900
              dark:!bg-slate-900
              dark:!text-slate-100
              dark:!shadow-black/30
            `,

            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },

          error: {
            duration: 3500,

            className: `
              !rounded-2xl
              !border
              !border-red-200
              !bg-white
              !px-4
              !py-3
              !text-sm
              !font-medium
              !text-slate-800
              !shadow-xl
              !shadow-red-900/10

              dark:!border-red-900
              dark:!bg-slate-900
              dark:!text-slate-100
              dark:!shadow-black/30
            `,

            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);