import { fetchApi } from "./fetchApi";
import { ENDPOINTS, PARAMS } from "../constants/api";

export const getBookingById = async (id, accessToken = {}) => {
  const endpoint = ENDPOINTS.bookingById.replace(
    "{id}",
    encodeURIComponent(id),
  );

  // Manually add the necessary parameters
  const queryParams = `${PARAMS._venue}${PARAMS._customer}`;
  // const queryParams = `?_venue=true&_customer=true`;

  // Form the complete URL directly
  const url = `${endpoint}${queryParams}`;

  try {
    const data = await fetchApi(url, {
      method: "GET",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch booking details:", error);
    return { data: null, error };
  }
};
