import { create } from "zustand";
import { save, load } from "../utils/storage.js";

const useStore = create((set) => ({
  // Initial state setup
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
    set({ accessToken });
  },

  clearAccessToken: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },

}));

export const isAuthenticatedSelector = (state) => !!load("isAuthenticated") || !!state.accessToken;

export default useStore;
