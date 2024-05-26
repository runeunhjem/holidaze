import { fetchApi } from "./fetchApi";
import { ENDPOINTS } from "../constants/api";

export const updateBooking = async (bookingId, bookingDetails, accessToken) => {
  const url = `${ENDPOINTS.bookings}/${bookingId}`;

  try {
    const data = await fetchApi(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookingDetails),
    });
    return { data, error: null };
  } catch (error) {
    console.error("Failed to update booking:", error);
    return { data: null, error };
  }
};
