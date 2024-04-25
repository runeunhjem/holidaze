import { create } from "zustand";
import { load, save } from "../utils/storage.js";

const useStore = create((set) => ({
  isAuthenticated: load("isAuthenticated") || false,
  isDarkMode: load("isDarkMode") || true,
  accessToken: load("accessToken"),
  userDetails: load("userDetails") || {},
  venues: [],
  justLoggedIn: false, // New state to control navigation after login

  toggleDarkMode: () =>
    set((state) => {
      const newIsDarkMode = !state.isDarkMode;
      // save("isDarkMode", newIsDarkMode);
      document.body.setAttribute(
        "data-theme",
        newIsDarkMode ? "dark" : "light",
      );
      return { isDarkMode: newIsDarkMode };
    }),

  setIsAuthenticated: (isAuthenticated) => {
    save("isAuthenticated", isAuthenticated);
    set({ isAuthenticated });
  },

  setAccessToken: (accessToken) => {
    save("accessToken", accessToken);
    set({ accessToken, isAuthenticated: true });
  },

  setUserDetails: (details) => {
    save("userDetails", details);
    set({ userDetails: details });
  },

  clearUser: () => {
    save("accessToken", null);
    save("isAuthenticated", false);
    save("userDetails", {});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userDetails");
    set({
      accessToken: null,
      isAuthenticated: false,
      userDetails: {},
      justLoggedIn: false,
    });
    // document.body.setAttribute("data-theme", "dark"); // Optionally reset to default theme
  },

  logIn: (userDetails) => {
    const { accessToken, ...restDetails } = userDetails;
    save("isAuthenticated", true);
    save("userDetails", restDetails);
    save("accessToken", accessToken);
    set({
      isAuthenticated: true,
      userDetails: restDetails,
      justLoggedIn: true,
      accessToken: accessToken,
    });
  },

  resetJustLoggedIn: () => set({ justLoggedIn: false }), // Reset the flag after navigation
}));

export default useStore;
