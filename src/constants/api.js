// src/constants/api.js
// export const API_BASE_URL_V1 = "https://api.noroff.dev/api/v1";
export const API_BASE_URL_V2 = "https://v2.api.noroff.dev";

// V2 API endpoints
export const ENDPOINTS = {
  register: "/auth/register", // POST - name, email, password
  // v1Register: "/holidaze/auth/register", // POST - name, email, password
  login: "/auth/login", // POST - email, password
  // v1Login: "/holidaze/auth/login", // POST - email, password
  profiles: "/holidaze/profiles", // GET - API_KEY is required
  profilesByName: "/holidaze/profiles", // GET - name - API_KEY is required
  searchProfiles: "/holidaze/profiles/search", // GET - query - API_KEY is required
  venuesByProfileName: "/holidaze/profiles/{username}/venues", // GET - name - API_KEY is required
  bookingsByProfileName: "/holidaze/profiles/{username}/bookings", // GET - name - API_KEY is required
  venues: "/holidaze/venues", // GET
  venueById: "/holidaze/venues/{id}", // GET - id
  searchVenues: "/holidaze/venues/search", // GET - query
  bookings: "/holidaze/bookings", // GET - API_KEY is required
  bookingById: "/holidaze/bookings/{id}", // GET - id - API_KEY is required
};

// Parameters
// V1: (.../venues?sort=country&sortOrder=desc&limit=100&offset=1&_owner=true&_bookings=true)
// V2: (.../venues?sort=country&sortOrder=desc&limit=100&page=1&_owner=true&_bookings=true)
export const PARAMS = {
  // limit: "&limit=100",
  // offset: "&offset=1",
  // sortBy: "&sort=name",
  // sortOrder: "&sortOrder=desc",
  // query: "?query=asia",
  // page: "?page=1",
  _bookings: "&_bookings=true",
  _owner: "?_owner=true",
  _venues: "?_venues=true",
  _venue: "?_venue=true",
  _customer: "&_customer=true"
};
