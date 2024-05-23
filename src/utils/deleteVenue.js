// utils/deleteVenue.js
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

export const deleteVenue = async (venueId, accessToken) => {
  try {
    const response = await fetchApi(
      `${ENDPOINTS.venues}/${venueId}`,
      {
        method: "DELETE",
      },
      accessToken,
    );

    console.log("response.status is: ", response.status);
    if (response.status === 204) {
      console.log("Successfully deleted venue");
      return {}; // Return an empty object or any value indicating success
    }

    console.log("Unexpected response:", response);
    throw new Error("Unexpected response format");
  } catch (error) {
    console.error("Failed to delete venue:", error.message);
    throw error;
  }
};
