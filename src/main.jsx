import ReactDOM from "react-dom/client";
import App from "./components/App";
import useStore from "./hooks/useStore";
import "./styles/global.css";

const isDarkMode = useStore.getState().isDarkMode;
document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope,
        );
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
