import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../constants/api";

const useProfile = () => {
  const { setUserDetails, accessToken, setViewedProfile } = useStore();
  const { username } = useParams();

  const fetchUserProfile = useCallback(async () => {
    const endpoint = `${ENDPOINTS.profiles}/${encodeURIComponent(username)}${PARAMS._venues}${PARAMS._bookings}`;
    console.log("Fetching user profile:", endpoint);
    try {
      const response = await fetchApi(endpoint, {
        method: "GET",
        headers: {
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        // setUserDetails(response.data);
        setViewedProfile(response.data);
        console.log("User profile fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  }, [username, accessToken, setViewedProfile]);
  // }, [username, accessToken, setUserDetails, setViewedProfile]);

  useEffect(() => {
    if (username) fetchUserProfile();
  }, [username, fetchUserProfile]); // fetchUserProfile is already wrapped with useCallback

  return { setUserDetails, setViewedProfile, fetchUserProfile };
};

export default useProfile;
