import { create } from "zustand";
import { save, load } from "../utils/storage.js";

const useStore = create((set) => ({
  // Initial state setup
  isAuthenticated: load("isAuthenticated") || false,
  isDarkMode: load("isDarkMode") || false,
  accessToken: load("accessToken"),
  venues: [],

  // Actions
  toggleDarkMode: () =>
    set((state) => {
      const newIsDarkMode = !state.isDarkMode;
      save("isDarkMode", newIsDarkMode);
      document.body.setAttribute("data-theme", newIsDarkMode ? "dark" : "light");
      return { isDarkMode: newIsDarkMode };
    }),

  logIn: () => {
    save("isAuthenticated", true);
    set({ isAuthenticated: true });
  },

  logOut: () => {
    save("isAuthenticated", false);
    localStorage.removeItem("accessToken"); // Clear access token on logout
    set({ isAuthenticated: false, accessToken: null });
  },

  setAccessToken: (accessToken) => {
    save("accessToken", accessToken);
    set({ accessToken, isAuthenticated: true }); // Set isAuthenticated when token is set
  },

  clearAccessToken: () => {
    save("accessToken", null);
    localStorage.removeItem("accessToken"); // Clear access token on logout
    set({ accessToken: null, isAuthenticated: false }); // Also update isAuthenticated
  },
}));

export const isAuthenticatedSelector = (state) => !!load("isAuthenticated") || !!state.accessToken;

export default useStore;
