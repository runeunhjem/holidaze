import { create } from "zustand";
// import { save, load } from "../utils/storage.js";
import { load } from "../utils/storage.js";

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
    // save("isAuthenticated", isAuthenticated);
    set({ isAuthenticated });
  },

  setAccessToken: (accessToken) => {
    // save("accessToken", accessToken);
    set({ accessToken, isAuthenticated: true });
  },

  setUserDetails: (details) => {
    // save("userDetails", details);
    set({ userDetails: details });
  },

  clearUser: () => {
    // save("accessToken", null);
    // save("isAuthenticated", false);
    // save("userDetails", {});
    // localStorage.removeItem("accessToken");
    set({
      accessToken: null,
      isAuthenticated: false,
      userDetails: {},
      justLoggedIn: false,
    });
    document.body.setAttribute("data-theme", "dark"); // Optionally reset to default theme
  },

  logIn: (userDetails) => {
    // save("isAuthenticated", true);
    // save("userDetails", userDetails);
    set({ isAuthenticated: true, userDetails, justLoggedIn: true });
  },

  // logOut: () => {
  //   // save("accessToken", null);
  //   // save("isAuthenticated", false);
  //   // save("userDetails", {});
  //   // localStorage.removeItem("accessToken");
  //   set({
  //     accessToken: null,
  //     isAuthenticated: false,
  //     userDetails: {},
  //     justLoggedIn: false,
  //   });
  //   document.body.setAttribute("data-theme", "dark"); // Optionally reset to default theme
  // },

  resetJustLoggedIn: () => set({ justLoggedIn: false }), // Reset the flag after navigation
}));

export default useStore;
