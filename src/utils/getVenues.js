// src/utils/getVenues.js
import { ENDPOINTS } from "../constants/api";
import { fetchApi } from "./fetchApi";

const endpoint = ENDPOINTS.venues;
export const getVenues = async (page, limit = 100) => {
  const offset = (page - 1) * limit;
  const params = {
    sort: "name",
    sortOrder: "desc",
    limit,
    offset,
    _owner: true,
    _bookings: true,
  };

  try {
    const response = await fetchApi(endpoint, { method: "GET" }, params);
    return { data: response.data, meta: response.meta };
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    return { data: [], meta: {}, error: error.message };
  }
};
