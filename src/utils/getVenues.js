import { fetchApi } from "./fetchApi";

export const getVenues = async (page, limit = 100) => {
  let offset = (page - 1) * limit; // Calculate offset based on page number
  const params = {
    sort: "name",
    sortOrder: "asc",
    limit,
    offset,
    _owner: true,
    _bookings: true,
  };

  try {
    const response = await fetchApi("venues", { method: "GET" }, params);
    // console.log("Fetched venues:", response);
    // Directly access the data field within the response object
    const newVenues = response.data && Array.isArray(response.data) ? response.data : [];
    console.log("Meta:", response.meta, "Data:", newVenues, "Error:", response.error);
    // console.log("Fetched venues length:", newVenues.length); // Make sure to log the length of the array
    return { data: newVenues, error: null };
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    return { data: [], error: "Failed to fetch venues. Please try again later." };
  }

};
