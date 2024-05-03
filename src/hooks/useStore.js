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
      favorites: [], // State for favorite venues
      venues: [],
      venuesMeta: {},
      justLoggedIn: false,

      setVenues: (data, meta) => set({ venues: data, venuesMeta: meta }),
      
      addFavoriteProfile: (profile) => {
        const { favoriteProfiles } = get();
        if (!favoriteProfiles.some((p) => p.name === profile.name)) {
          set({ favoriteProfiles: [...favoriteProfiles, profile] });
        }
      },

      removeFavoriteProfile: (profileName) => {
        set((state) => ({
          favoriteProfiles: state.favoriteProfiles.filter(
            (p) => p.name !== profileName,
          ),
        }));
      },

      addFavoriteVenue: (venue) => {
        const { favorites } = get();
        if (!favorites.some((v) => v.id === venue.id)) {
          set({ favorites: [...favorites, venue] });
        }
      },

      removeFavoriteVenue: (venueId) =>
        set((state) => ({
          favorites: state.favorites.filter((v) => v.id !== venueId),
        })),

      toggleDarkMode: () =>
        set((state) => {
          const newIsDarkMode = !state.isDarkMode;
          document.body.setAttribute(
            "data-theme",
            newIsDarkMode ? "dark" : "light",
          );
          return { isDarkMode: newIsDarkMode };
        }),

      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      setAccessToken: (accessToken) =>
        set({ accessToken, isAuthenticated: true }),

      setUserDetails: (details) => set({ userDetails: details }),

      setViewedProfile: (details) => set({ viewedProfile: details }),

      clearUser: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          userDetails: {},
          viewedProfile: {},
          bookings: [],
        });
      },

      logIn: (userDetails) => {
        const { accessToken, ...restDetails } = userDetails;
        set({
          isAuthenticated: true,
          userDetails: restDetails,
          viewedProfile: restDetails,
          justLoggedIn: true,
          accessToken,
        });
      },

      resetJustLoggedIn: () => set({ justLoggedIn: false }),
    }),
    {
      name: "user-info-and-favs",
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
