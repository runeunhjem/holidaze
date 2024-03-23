// src/constants/api.js
export const API_BASE_URL_V1 = "https://api.noroff.dev/api/v1";
export const API_BASE_URL_V2 = "https://v2.api.noroff.dev";

// V2 API endpoints
export const ENDPOINTS = {
  register: "/auth/register", // POST - name, email, password
  login: "/auth/login", // POST - email, password
  profiles: "/holidaze/profiles", // GET - API_KEY is required
  profilesByName: "/holidaze/profiles/{name}", // GET - name - API_KEY is required
  searchProfiles: "/holidaze/profiles/search", // GET - query - API_KEY is required
  venuesByProfileName: "/holidaze/profiles/{name}/venues", // GET - name - API_KEY is required
  bookingsByProfileName: "/holidaze/profiles/{name}/bookings", // GET - name - API_KEY is required
  venues: "/holidaze/venues", // GET
  venueById: "/holidaze/venues/{id}", // GET - id
  searchVenues: "/holidaze/venues/search", // GET - query
  bookings: "/holidaze/bookings", // GET - API_KEY is required
  bookingById: "/holidaze/bookings/{id}", // GET - id - API_KEY is required
};
