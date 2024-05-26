export const API_BASE_URL_V2 = "https://v2.api.noroff.dev";

export const ENDPOINTS = {
  register: "/auth/register", // POST - name, email, password
  login: "/auth/login", // POST - email, password
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

export const PARAMS = {
  sortBy: "&sort=name",
  sortOrder: "&sortOrder=asc",
  _bookings: "&_bookings=true",
  _owner: "?_owner=true",
  _venues: "?_venues=true",
  _venue: "?_venue=true",
  _customer: "&_customer=true",
};
