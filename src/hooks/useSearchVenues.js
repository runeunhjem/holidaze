import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../hooks/useStore";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS } from "../constants/api";

const useSearchVenues = () => {
  const location = useLocation();
  const { setVenues, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchVenues = async () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("q");
      if (!query) return; // Avoid fetching if no query is present

      setLoading(true);
      try {
        const url = `${ENDPOINTS.venues}/search?q=${encodeURIComponent(query)}`;
        console.log("Fetching from URL:", url);
        const response = await fetchApi(url);
        console.log("API Response:", response);
        if (response && Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          setError("No data found or unexpected format.");
        }
      } catch (error) {
        setError(`Error searching venues: ${error.message}`);
        console.error("Error searching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [location.search, setVenues, setLoading, setError]);

  return {
    // Assuming you implement the necessary selectors to get these from the store
  };
};

export default useSearchVenues;
