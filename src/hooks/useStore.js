import { create } from "zustand";

const useStore = create((set) => ({

  isAuthenticated: false,
  isDarkMode: false,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  logIn: () => set({ isAuthenticated: true }),
  logOut: () => set({ isAuthenticated: false }),
}));

export default useStore;
