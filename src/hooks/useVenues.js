import { useEffect } from "react";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";
import useStore from "./useStore";

const useVenues = () => {
  const {
    currentPage,
    filters,
    setVenues,
    setLoading,
    setError,
    venues,
    venuesMeta,
    loading,
    error,
  } = useStore((state) => ({
    currentPage: state.currentPage,
    filters: state.filters,
    setVenues: state.setVenues,
    setLoading: state.setLoading,
    setError: state.setError,
    venues: state.venues,
    venuesMeta: state.venuesMeta,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10, // Or manage limit from the store
        sortBy: "name",
        sortOrder: "asc",
        ...filters,
      };
      const queryParams = new URLSearchParams(params).toString();

      try {
        const response = await fetchApi(`${ENDPOINTS.venues}?${queryParams}`);
        if (response && response.data && response.meta) {
          setVenues(response.data, response.meta);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch venues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [currentPage, filters, setLoading, setError, setVenues]);

  return { venues, venuesMeta, loading, error };
};

export default useVenues;
