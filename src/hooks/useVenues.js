import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchApi";

const useVenues = (page, limit = 100) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const params = {
          sort: "name",
          sortOrder: "asc",
          limit,
          offset: (page - 1) * limit,
          _owner: true,
          _bookings: true,
        };
        const response = await fetchApi("venues", { method: "GET" }, params);
        if (response && response.data && response.meta) {
          setVenues(response.data);
          setTotalPages(Math.ceil(response.meta.totalCount / limit));
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
