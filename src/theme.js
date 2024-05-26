import { createTheme } from "@mui/material/styles";

const getTheme = (isDarkMode) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

export default getTheme;
