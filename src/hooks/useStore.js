import { create } from "zustand";
import { save, load } from "../utils/StorageUtils"; // Adjust the path as needed

const useStore = create((set) => ({
  isAuthenticated: load("isAuthenticated") || false, // Load from local storage or default to false
  isDarkMode: false,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  logIn: () => {
    save("isAuthenticated", true); // Save to local storage
    set({ isAuthenticated: true });
  },
  logOut: () => {
    save("isAuthenticated", false); // Remove from local storage
    set({ isAuthenticated: false });
  },
}));

export default useStore;
