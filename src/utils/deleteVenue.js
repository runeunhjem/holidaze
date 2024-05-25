// utils/deleteVenue.js
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

export const deleteVenue = async (venueId, accessToken) => {
  try {
    const response = await fetchApi(`${ENDPOINTS.venues}/${venueId}`, {
      method: "DELETE",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      console.log("Successfully deleted venue");
      return { status: 204 }; // Return an object indicating success
    }

    const errorData = await response.json();
    console.log("Unexpected response:", errorData);
    throw new Error("Unexpected response format");
  } catch (error) {
    console.error("Failed to delete venue:", error.message);
    throw error;
  }
};
