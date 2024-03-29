// src/utils/getVenueById.js

import { fetchApi } from "./fetchApi";

export const getVenueById = async (id) => {
  try {
    const data = await fetchApi("venueById", {}, { id });
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch venue details:", error);
    return { data: null, error };
  }
};
