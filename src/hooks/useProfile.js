import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../constants/api";

const useProfile = () => {
  const { setViewedProfile, accessToken } = useStore();
  const { username } = useParams();

  const fetchUserProfile = useCallback(async () => {
    const endpoint = `${ENDPOINTS.profiles}/${encodeURIComponent(username)}${PARAMS._venues}${PARAMS._bookings}`;

    try {
      const response = await fetchApi(endpoint, {
        method: "GET",
        headers: {
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.data) {
        setViewedProfile(response.data);

        return response.data;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
    return null;
  }, [accessToken, setViewedProfile, username]);

  return { fetchUserProfile };
};

export default useProfile;
