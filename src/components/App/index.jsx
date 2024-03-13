import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import Layout from "../Layout";
import Home from "../../pages/Home";
import VenueList from "../../pages/VenueList";
import VenueDetails from "../../pages/VenueDetails";
import Dashboard from "../../pages/Dashboard";
import LogIn from "../../pages/LogIn";
import Register from "../../pages/Register";
import Contact from "../../pages/Contact";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "../../theme";

function App() {
  const { isAuthenticated, isDarkMode } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isDarkMode: state.isDarkMode,
  }));
  const theme = React.useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venues" element={<VenueList />} />
            <Route path="/venues/:id" element={<VenueDetails />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;

