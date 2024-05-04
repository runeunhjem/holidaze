import { useEffect } from "react";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";
import useStore from "./useStore";

const useVenues = (currentPage, limit = 10) => {
  const {
    setVenues,
    venues,
    venuesMeta,
    setLoading,
    setError,
    loading,
    error,
  } = useStore();

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
      const queryParams = new URLSearchParams(params).toString();

      try {
        const response = await fetchApi(`${ENDPOINTS.venues}?${queryParams}`, {
          method: "GET",
        });

        if (response && response.data && response.meta) {
          setVenues(response.data, response.meta);
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
  }, [currentPage, limit, setVenues, setLoading, setError]);

  return { venues, venuesMeta, loading, error };
};

export default useVenues;
