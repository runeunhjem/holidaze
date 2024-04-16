import { FiMoon, FiSun } from "react-icons/fi";
import useStore from "../../hooks/useStore";
import { useEffect } from "react";

function ToggleTheme() {
  const { isDarkMode, toggleDarkMode } = useStore((state) => ({
    isDarkMode: state.isDarkMode,
    toggleDarkMode: state.toggleDarkMode,
  }));

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Theme"
      style={{ transition: "all 0.3s ease", backgroundColor: "var(--overlay-color-dark)" }}
      className="flex items-center justify-center p-1.5 my-3 me-3 rounded-full">
      {isDarkMode ? <FiMoon className="hover:text-yellow-400" /> : <FiSun className="hover:text-yellow-400 text-sky-300" />}
      <span className="hidden">Toggle Theme</span>
    </button>
  );
}

export default ToggleTheme;
