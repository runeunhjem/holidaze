import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isDarkMode: true,
      accessToken: null,
      userDetails: {},
      viewedProfile: {},
      favoriteProfiles: [],
      isFavorite: false,
      venues: [],
      justLoggedIn: false,

      addFavoriteProfile: (profile) => {
        const { favoriteProfiles } = get();
        if (!favoriteProfiles.some((p) => p.id === profile.id)) {
          set({ favoriteProfiles: [...favoriteProfiles, profile] });
        }
      },

      removeFavoriteProfile: (profileId) => {
        set((state) => ({
          favoriteProfiles: state.favoriteProfiles.filter(
            (p) => p.id !== profileId,
          ),
        }));
      },

      toggleDarkMode: () =>
        set((state) => {
          const newIsDarkMode = !state.isDarkMode;
          document.body.setAttribute(
            "data-theme",
            newIsDarkMode ? "dark" : "light",
          );
          return { isDarkMode: newIsDarkMode };
        }),

      setIsAuthenticated: (isAuthenticated) =>
        set({
          isAuthenticated,
        }),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: true,
        }),

      setUserDetails: (details) =>
        set({
          userDetails: details,
        }),

      setViewedProfile: (details) =>
        set({
          viewedProfile: details,
        }),

      clearUser: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          userDetails: {},
          viewedProfile: {},
          favoriteProfiles: [],
          justLoggedIn: false,
        }),

      logIn: (userDetails) => {
        const { accessToken, ...restDetails } = userDetails;

        set({
          isAuthenticated: true,
          userDetails: restDetails,
          viewedProfile: restDetails,
          justLoggedIn: true,
          accessToken: accessToken,
        });
      },

      resetJustLoggedIn: () => set({ justLoggedIn: false }),
    }),
    {
      name: "favorite-profiles-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          try {
            return JSON.parse(item);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const stringifiedValue = JSON.stringify(value);
          localStorage.setItem(name, stringifiedValue);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export default useStore;
