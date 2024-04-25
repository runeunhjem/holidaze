// src/utils/getVenues.js
import { fetchApi } from "./fetchApi";

export const getVenues = async (page, limit = 100) => {
  const offset = (page - 1) * limit;
  const params = {
    // sort: "createdAt",
    // sortOrder: "desc",
    limit,
    offset,
    _owner: true,
    _bookings: true,
  };

  try {
    const response = await fetchApi("venues", { method: "GET" }, params);
    return { data: response.data, meta: response.meta };
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    return { data: [], meta: {}, error: error.message };
  }
};
