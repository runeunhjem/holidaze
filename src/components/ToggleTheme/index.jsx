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
      onClick={ toggleDarkMode }
      aria-label="Toggle Theme"
      style={ { transition: "all 0.3s ease"  } }
      className="flex items-center justify-center p-1.5 my-3 me-2 bg-yellow-300 shadow dark:bg-gray-700 rounded-full hover:bg-yellow-400 dark:hover:bg-gray-500">
      {isDarkMode ? <FiMoon className="text-gray-200" /> : <FiSun className="text-gray-500" />}
      <span className="hidden">Toggle Theme</span>
    </button>
  );
}

export default ToggleTheme;
