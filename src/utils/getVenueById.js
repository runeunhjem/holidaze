import { fetchApi } from "./fetchApi";
import { ENDPOINTS } from "../constants/api";

export const getVenueById = async (id, extraParams = {}) => {
  const defaultParams = {
    _owner: true,
    _bookings: true,
  };

  const params = { ...defaultParams, ...extraParams };
  const queryParams = new URLSearchParams(params).toString();

  const endpoint = ENDPOINTS.venueById.replace("{id}", encodeURIComponent(id));
  const url = `${endpoint}?${queryParams}`;

  try {
    const data = await fetchApi(url, { method: "GET" });
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch venue details:", error);
    return { data: null, error };
  }
};
