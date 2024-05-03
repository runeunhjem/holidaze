import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../constants/api";

const useVenues = (page, limit = 100) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);

      // Build query parameters
      // const params = {
      //   sortBy: "name",
      //   sortOrder: "asc",
      //   limit,
      //   offset: (page - 1) * limit,
      //   _owner: true,
      //   _bookings: true,
      // };
      // const queryParams = new URLSearchParams(params).toString();

      try {
        // const response = await fetchApi(`${ENDPOINTS.venues}?${queryParams}`, {
        const response = await fetchApi(`${ENDPOINTS.venues}${PARAMS._owner}${PARAMS._bookings}`, {
          method: "GET",
        });
        console.log("Venues response:", response);

        if (response && response.data && response.meta) {
          setVenues(response.data);
          setTotalPages(Math.ceil(response.meta.totalCount / limit));
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
  }, [page, limit]);

  return { venues, loading, error, totalPages };
};

export default useVenues;
