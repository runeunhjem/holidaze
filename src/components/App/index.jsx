import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import Layout from "../Layout";
import LogIn from "../../pages/LogIn";
import Dashboard from "../../pages/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Helps with consistent baseline styles
import getTheme from "../../theme";

function App() {
  const { isAuthenticated, isDarkMode } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isDarkMode: state.isDarkMode,
  }));
  const theme = React.useMemo(() => getTheme(isDarkMode), [isDarkMode]); // Dynamically get the theme

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={!isAuthenticated ? <LogIn /> : <Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            {/* Define more protected routes as needed */}
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;

