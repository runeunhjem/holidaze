import { createTheme } from "@mui/material/styles";

// Function to create a theme based on the dark mode state
const getTheme = (isDarkMode) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      // Add any other customizations here
    },
    // You can also customize typography, components, etc., based on the mode
  });

export default getTheme;
