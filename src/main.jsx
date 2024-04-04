// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import useStore from "./hooks/useStore"; // Adjust the path as needed
import "./styles/global.css";

// Initial theme setup based on the stored 'isDarkMode' value or default to false
const isDarkMode = useStore.getState().isDarkMode;
document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
// console.log(import.meta.env.VITE_API_KEY);
// console.log(import.meta.env);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
