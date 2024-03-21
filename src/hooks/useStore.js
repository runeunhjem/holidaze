// src/stores/useVenueStore.js
import { create } from "zustand";
import { save, load } from "../utils/StorageUtils"; // Adjust the path as needed

const useVenueStore = create((set) => ({
  isAuthenticated: load("isAuthenticated") || false,
  isDarkMode: false,
  venues: [], // Add a new state for storing fetched venues

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  logIn: () => {
    save("isAuthenticated", true);
    set({ isAuthenticated: true });
  },
  logOut: () => {
    save("isAuthenticated", false);
    set({ isAuthenticated: false });
  },

  // Async action to fetch venues
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

export default useVenueStore;
