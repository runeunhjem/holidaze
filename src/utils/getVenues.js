import { fetchApi } from "./fetchApi";

export const getVenues = async () => {
  const totalVenues = 500; // Total number of venues to fetch
  const limit = 100; // Number of venues to fetch per request
  let allVenues = []; // Array to accumulate the fetched venues
  let offset = 0; // Offset for pagination

  while (allVenues.length < totalVenues) {
    const params = {
      sort: "created",
      sortOrder: "desc",
      limit,
      offset,
      _owner: true,
      _bookings: true,
    };

    try {
      const response = await fetchApi("venues", { method: "GET" }, params);
      const newVenues = response && Array.isArray(response) ? response : [];

      if (newVenues.length === 0) {
        // If no venues are returned, stop the loop
        break;
      }

      allVenues = allVenues.concat(newVenues);
      offset += limit; // Prepare the offset for the next batch
      console.log("Fetched venues:", allVenues.length);

      if (newVenues.length < limit) {
        // If fewer venues than the limit are returned, it means we've reached the end
        break;
      }
    } catch (error) {
      console.error("Failed to fetch venues:", error);
      return { data: [], error: "Failed to fetch venues. Please try again later." };
    }
  }

  // If we fetched more than the desired total, truncate the array
  if (allVenues.length > totalVenues) {
    allVenues = allVenues.slice(0, totalVenues);
  }

  return { data: allVenues, error: null };
};
