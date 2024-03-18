// src/constants/api.js
export const API_BASE_URL = "https://v2.api.noroff.dev";

export const ENDPOINTS = {
  profiles: "/holidaze/profiles",
  profilesByName: "/holidaze/profiles/{name}",
  searchProfiles: "/holidaze/profiles/search",
  venuesByProfileName: "/holidaze/profiles/{name}/venues",
  bookingsByProfileName: "/holidaze/profiles/{name}/bookings",
  venues: "/holidaze/venues",
  venueById: "/holidaze/venues/{id}",
  searchVenues: "/holidaze/venues/search",
  bookings: "/holidaze/bookings",
  bookingById: "/holidaze/bookings/{id}",
};
