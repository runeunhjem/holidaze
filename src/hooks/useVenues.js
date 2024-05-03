import { useState, useEffect } from "react";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

const useVenues = (currentPage, limit = 10) => {
  const [venues, setVenues] = useState([]);
  const [venuesMeta, setVenuesMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);

      const params = {
        page: currentPage,
        limit,
        sortBy: "name",
        sortOrder: "asc",
        _owner: true,
        _bookings: true,
      };
      // console.log("Venues params:", params);
      const queryParams = new URLSearchParams(params).toString();

      try {
        const response = await fetchApi(`${ENDPOINTS.venues}?${queryParams}`, {
          method: "GET",
        });
        // console.log("Venues response:", response);

        if (response && response.data && response.meta) {
          setVenues(response.data);
          setVenuesMeta(response.meta);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [currentPage, limit]);

  return { venues, venuesMeta, loading, error };
};

export default useVenues;
