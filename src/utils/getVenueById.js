// src/utils/getVenueById.js

import { fetchApi } from "./fetchApi";

export const getVenueById = async (id, extraParams = {}) => {
  // Default parameters that you always want to include
  const defaultParams = {
    _owner: true,
    _bookings: true,
  };

  // Combine default parameters with any extra parameters provided
  const params = { ...defaultParams, ...extraParams };

  try {
    const data = await fetchApi("venueById", { method: "GET" }, { id, ...params });
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch venue details:", error);
    return { data: null, error };
  }
};
