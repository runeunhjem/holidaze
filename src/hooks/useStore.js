import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS, PARAMS } from "../constants/api";
import { fetchApi } from "../utils/fetchApi";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        options: {
          checkImage: false,
          checkTitle: false,
          checkCountry: true,
          checkContinent: true,
          minImagesCount: true,
        },
        setOptions: (newOptions) =>
          set((state) => ({ options: { ...state.options, ...newOptions } })),
        isAuthenticated: false,
        isDarkMode: true,
        accessToken: null,
        userDetails: {},
        viewedProfile: {},
        favoriteProfiles: [],
        favorites: [],
        venues: [],
        venuesMeta: {},
        currentPage: 1,
        setCurrentPage: (page) => set(() => ({ currentPage: page })),
        venuesPerPage: 10,
        setVenuesPerPage: (limit) =>
          set({ venuesPerPage: limit, currentPage: 1 }),
        justLoggedIn: false,
        optionsMenuIsOpen: false,
        filtersMenuIsOpen: false,
        resetFilters: () => {
          set(() => ({
            filters: {
              rating: "",
              maxPrice: "",
              minPrice: "",
              city: "",
              country: "",
              continent: "",
              maxGuests: "",
              amenities: [],
              hasBookings: false,
              manager: "",
            },
          }));
        },
        filters: {
          rating: "",
          maxPrice: "",
          minPrice: "",
          city: "",
          country: "",
          continent: "",
          maxGuests: "",
          amenities: [],
          hasBookings: false,
          manager: "",
        },
        setFilter: (filterKey, value) =>
          set((state) => ({
            filters: { ...state.filters, [filterKey]: value },
          })),
        filterOptions: {
          rating: [],
          maxPrice: [],
          minPrice: [],
          city: [],
          country: [],
          continent: [],
          maxGuests: [],
          amenities: [],
          manager: [],
          hasBookings: [],
        },
        updateFilterOptions: () => {
          const { venues } = get();
          const amenities = new Set();
          venues.forEach((venue) => {
            Object.keys(venue.meta || {}).forEach((key) => {
              if (venue.meta[key]) {
                amenities.add(key);
              }
            });
          });

          const newFilterOptions = {
            rating: [...new Set(venues.map((v) => v.rating))].sort(
              (a, b) => a - b,
            ),
            maxPrice: [...new Set(venues.map((v) => v.price))].sort(
              (a, b) => a - b,
            ),
            minPrice: [...new Set(venues.map((v) => v.price))].sort(
              (a, b) => a - b,
            ),
            city: [...new Set(venues.map((v) => v.location.city))].sort(),
            country: [...new Set(venues.map((v) => v.location.country))].sort(),
            continent: [
              ...new Set(venues.map((v) => v.location.continent)),
            ].sort(),
            maxGuests: [...new Set(venues.map((v) => v.maxGuests))].sort(
              (a, b) => a - b,
            ),
            amenities: [...amenities].sort(),
            manager: [...new Set(venues.map((v) => v.owner?.name))].sort(),
            hasBookings: [true, false],
          };
          set({ filterOptions: newFilterOptions });
        },
        toggleOptionsOpen: () =>
          set((state) => ({ optionsMenuIsOpen: !state.optionsMenuIsOpen })),
        toggleFiltersOpen: () =>
          set((state) => ({ filtersMenuIsOpen: !state.filtersMenuIsOpen })),
        closeAll: () =>
          set({ optionsMenuIsOpen: false, filtersMenuIsOpen: false }),
        setVenues: (data, meta) => set({ venues: data, venuesMeta: meta }),
        setLoading: (loading) => set({ loading }),
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
        setViewedProfile: (details) =>
          set((state) => ({
            viewedProfile: {
              ...state.viewedProfile,
              ...details,
            },
          })),
        clearUser: () => {
          set({
            accessToken: null,
            isAuthenticated: false,
            userDetails: {},
            viewedProfile: {},
            bookings: [],
            venues: [],
            venuesMeta: {},
          });
        },
        logIn: async (userDetails) => {
          const { accessToken, ...restDetails } = userDetails;
          set({
            isAuthenticated: true,
            userDetails: restDetails,
            viewedProfile: restDetails,
            accessToken,
            justLoggedIn: true,
          });
          try {
            const profileResponse = await fetchApi(
              `${ENDPOINTS.profiles}/${restDetails.username}${PARAMS._venues}`,
              {
                method: "GET",
                headers: {
                  "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            if (profileResponse && profileResponse.data) {
              set({ viewedProfile: profileResponse.data });
            } else {
              console.error("Failed to fetch full user profile");
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        },
        resetJustLoggedIn: () => set({ justLoggedIn: false }),
        countActiveOptions: () => {
          const { options } = get();
          return Object.values(options).filter((value) => value).length;
        },
        countActiveFilters: () => {
          const { filters } = get();
          return Object.values(filters).reduce((count, value) => {
            if (
              value &&
              value !== "" &&
              !(Array.isArray(value) && value.length === 0)
            ) {
              count += 1;
            }
            return count;
          }, 0);
        },
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
  ),
);

export default useStore;
