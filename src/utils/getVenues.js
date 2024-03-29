import { fetchApi } from "./fetchApi";

export const getVenues = async () => {
  const options = {
    method: "GET",
  };
  const params = {
    sort: "maxGuests",
    sortOrder: "asc",
    limit: 100,
    offset: 200,
    _owner: true,
    _bookings: true,
  };

  try {
    const response = await fetchApi("venues", options, params);
    // const response = await fetchApi("venues", options);

    let data;
    // Check if the response directly contains an array
    if (Array.isArray(response)) {
      data = response;
      console.log("data", data);
    }
    // Check if the response contains a 'data' property that's an array
    else if (response && Array.isArray(response.data)) {
      data = response.data;
    }
    // Handle unexpected response format
    else {
      console.error("Unexpected response format:", response);
      return { data: [], error: "Unexpected response format. Please try again later." };
    }
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    return { data: [], error: "Failed to fetch venues. Please try again later." };
  }
};
