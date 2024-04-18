import propTypes from "prop-types";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import Layout from "../Layout";
import HomePage from "../../pages/HomePage";
import VenueListPage from "../../pages/VenueListPage";
import VenueDetailsPage from "../../pages/VenueDetailsPage";
import ProfilePage from "../../pages/ProfilePage";
import LogInPage from "../../pages/LogInPage";
import RegisterPage from "../../pages/RegisterPage";
import ContactPage from "../../pages/ContactPage";
import AboutPage from "../../pages/AboutPage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "../../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyVenuesPage from "../../pages/MyVenuesPage";
import MyBookingsPage from "../../pages/MyBookingsPage";
import MyFavoritesPage from "../../pages/MyFavoritesPage";

function App() {
  const { isAuthenticated, isDarkMode } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isDarkMode: state.isDarkMode,
  }));

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const theme = React.useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/destinations" element={<VenueListPage />} />
              <Route path="/venues/:id" element={<VenueDetailsPage />} />
              <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} />
              <Route path="/login" element={!isAuthenticated ? <LogInPage /> : <Navigate to="/profile" replace />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/myFavorites" element={<MyFavoritesPage />} />
              <Route path="/myBookings" element={<MyBookingsPage />} />
              <Route path="/myVenues" element={<MyVenuesPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </LocalizationProvider>
    </Router>
  );
}

App.propTypes = {
  children: propTypes.node, // 'node' covers anything that can be rendered: numbers, strings, elements, or an array (or fragment) containing these types.
};

export default App;
