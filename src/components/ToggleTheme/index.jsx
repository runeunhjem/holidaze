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
      className="flex items-center justify-center p-2 bg-gray-600 dark:bg-gray-700 rounded-full">
      {isDarkMode ? <FiMoon className="text-gray-200" /> : <FiSun className="text-yellow-500" />}
    </button>
  );
}

export default ToggleTheme;
