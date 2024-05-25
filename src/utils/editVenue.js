import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

export const editVenue = async (venueId, venueData, accessToken) => {
  try {
    const response = await fetchApi(`${ENDPOINTS.venues}/${venueId}`, {
      method: "PUT",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venueData),
    });

    if (response && response.data) {
      return response.data;
    }

    throw new Error("Unexpected response format");
  } catch (error) {
    console.error("Failed to update venue:", error.message);
    throw error;
  }
};
