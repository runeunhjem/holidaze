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

// Old theme.js
export const lightTheme = {
  body: "var(--color-white)",
  text: "var(--color-black)",
  h2: "var(--color-white)",
  header: "var(--color-pink)",
  colors: {
    success: "var(--color-success)",
    white: "var(--color-white)",
    black: "var(--color-black)",
    error: "var(--color-red)",
    text: "var(--color-black)",
    active: "var(--color-pink-light)",
    pink: "var(--color-pink)",
    red: "var(--color-red)",
  },

  viewProductButton: "var(--color-pink-light)",
  viewProductButtonHover: "var(--color-pink)",
  viewProductButtonHoverDark: "var(--color-pink-dark)",
  productCardShadow: "var(--card-shadow-light)",
  productCardBackground: "var(--color-white)",
  navLinkShadow: "var(--box-shadow-light)",
  productCardText: "var(--color-black)",
  priceTextDiscounted: "var(--color-red)",
  priceBgDiscounted: "var(--color-red)",
  priceBgNormal: "var(--color-price-normal)",
  priceTextNormal: "var(--color-black)",
  input: "var(--color-white)",
  inputText: "var(--color-black)",
  inputBorderColor: "var(--color-gray-light)",
  searchResultBackground: "var(--color-pink-xlight)",
  searchResultBackgroundHover: "var(--color-pink-hover)",
  searchResultText: "var(--color-black)",
  removeButtonText: "var(--color-white)",
  errorMessage: "red",
  successMessage: "green",
  checkoutButton: "var(--color-success)",
  checkoutButtonText: "var(--color-white)",
  disabledButtonBgColor: "var(--color-gray)",
};

export const darkTheme = {
  body: "var(--color-gray-dark)",
  text: "var(--color-pink-lighter)",
  h2: "var(--color-pink-lighter)",
  header: "var(--color-pink-dark)",
  colors: {
    success: "var(--color-success-darkMode)",
    white: "var(--color-white)",
    black: "var(--color-black)",
    error: "var(--color-red-light)",
    text: "var(--color-pink-lighter)",
    active: "var(--color-pink-light)",
    pink: "var(--color-pink)",
    red: "var(--color-red)",
  },

  viewProductButton: "var(--color-pink-dark)",
  viewProductButtonHover: "var(--color-pink)",
  viewProductButtonHoverDark: "var(--color-pink-dark)",
  productCardShadow: "var(--card-shadow-dark)",
  navLinkShadow: "var(--box-shadow-dark)",
  productCardText: "var(--color-pink-xlight)",
  priceBgDiscounted: "var(--color-white)",
  priceTextDiscounted: "var(--color-red-light)",
  priceBgNormal: "var(--color-price-normal)",
  priceTextNormal: "var(--color-pink-lighter)",
  input: "var(--color-pink-xlight)",
  inputText: "var(--color-black)",
  inputBorderColor: "var(--color-pink-light)",
  searchResultBackground: "var(--color-gray-dark)",
  searchResultBackgroundHover: "var(--color-gray-dark-hover)",
  searchResultText: "var(--color-pink-xlight)",
  removeButtonText: "var(--color-black)",
  errorMessage: "red",
  successMessage: "green",
  checkoutButton: "var(--color-success-darkMode)",
  checkoutButtonText: "var(--color-black)",
  disabledButtonBgColor: "var(--color-gray)",
};
