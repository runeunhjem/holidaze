// src/hooks/useVenues.js
import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchApi";
import useStore from "./useStore";

const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
        };
        const data = await fetchApi("venues", options);
        setVenues(data.data); // Assuming the API response format
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchVenues();
    }
  }, [accessToken]);

  return { venues, loading, error };
};

export default useVenues;
