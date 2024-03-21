import { create } from "zustand";
import { save, load } from "../utils/StorageUtils"; // Adjust the path as needed

const useStore = create((set) => ({
  isAuthenticated: load("isAuthenticated") || false,
  isDarkMode: load("isDarkMode") || false, // Load initial dark mode value from storage or default to false
  venues: [],

  toggleDarkMode: () => set((state) => {
    const newIsDarkMode = !state.isDarkMode;
    save("isDarkMode", newIsDarkMode); // Save the new dark mode state

    // Update the body's data-theme attribute
    document.body.setAttribute('data-theme', newIsDarkMode ? 'dark' : 'light');

    return { isDarkMode: newIsDarkMode };
  }),

  logIn: () => {
    save("isAuthenticated", true);
    set({ isAuthenticated: true });
  },
  logOut: () => {
    save("isAuthenticated", false);
    set({ isAuthenticated: false });
  },

  fetchVenues: async () => {
    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues?_owner=true&_bookings=true", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const data = await response.json();
      set({ venues: data.data }); // Update the venues state with the fetched data
    } catch (error) {
      console.error("Failed to fetch venues:", error);
    }
  },
}));

export default useStore;
