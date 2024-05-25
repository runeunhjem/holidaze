import { fetchApi } from "./fetchApi";
import { ENDPOINTS } from "../constants/api";

export const deleteBooking = async (bookingId, accessToken) => {
  const url = `${ENDPOINTS.bookings}/${bookingId}`;

  try {
    const { data, error } = await fetchApi(url, {
      method: "DELETE",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { data, error };
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return { data: null, error };
  }
};
