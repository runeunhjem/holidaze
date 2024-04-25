import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

const useVenues = (page, limit = 100) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      const endpoint = `${ENDPOINTS.venues}`;

      try {
        const params = {
          // sort: "createdAt",
          // sortOrder: "desc",
          limit: limit,
          offset: (page - 1) * limit,
          _owner: true,
          _bookings: true,
        };
        const response = await fetchApi(endpoint, { method: "GET" }, params);
        if (response && response.data && response.meta) {
          setVenues(response.data);
          console.log("response.meta.totalCount", response.meta.totalCount);
          setTotalPages(Math.ceil(response.meta.totalCount / limit));
          console.log("totalPages", totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [page, limit, totalPages]);

  return { venues, loading, error, totalPages };
};

export default useVenues;
