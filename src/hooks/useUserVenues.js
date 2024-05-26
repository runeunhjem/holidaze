import { useEffect, useCallback, useState } from "react";
import useStore from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

const useUserVenues = (username) => {
  const { accessToken } = useStore();
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserVenues = useCallback(async () => {
    const endpoint = `${ENDPOINTS.venues}?_owner=true&_bookings=true`;
    try {
      const response = await fetchApi(endpoint, {
        method: "GET",
        headers: {
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        const userVenues = response.data.filter((venue) => {
          const owner = venue.owner;

          return owner && owner.name === username;
        });

        setVenues(userVenues);
      } else {
        setVenues([]);
      }
    } catch (error) {
      console.error("Error fetching user venues:", error.message);
      setVenues([]);
      setError(error.message);
    }
  }, [username, accessToken]);

  useEffect(() => {
    if (username) fetchUserVenues();
  }, [username, fetchUserVenues]);

  return { venues, error, fetchUserVenues };
};

export default useUserVenues;
