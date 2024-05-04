import { useNavigate } from "react-router-dom";
import useStore from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../constants/api";
import { save } from "../utils/storage"; // Ensure you are importing load if you need it elsewhere

const useAuth = () => {
  const navigate = useNavigate();
  const { logIn, clearUser, setAccessToken } = useStore(); // Ensure you have setAccessToken action in your Zustand store

  const endpoint = `${ ENDPOINTS.login }?${PARAMS._bookings}`;
  const logInAsync = async (credentials) => {
    try {
      const response = await fetchApi(endpoint, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      console.log("Login response:", response);

      const data = response.data; // Assuming fetchApi already parses JSON
      if (data.accessToken && data.name) {
        // Save accessToken to local storage and Zustand store
        // save("accessToken", data.accessToken);
        setAccessToken(data.accessToken);

        logIn({
          username: data.name,
          name: data.name,
          email: data.email,
          bio: data.bio,
          avatar: data.avatar,
          banner: data.banner,
          accessToken: data.accessToken,
        });
        // console.log("Fetching user profile details for:", data.name);
        // navigate(`/profile/${encodeURIComponent(data.name)}`); // Navigate to user's profile page
      } else {
        console.error("Login failed: No access token or username received");
        throw new Error("Login failed: No access token or username received");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logOut = () => {
    // Clear access token from local storage and Zustand store
    save("accessToken", null); // Optional: clear from local storage if needed
    clearUser(); // Ensure this action also clears accessToken in the store
    navigate("/");
  };

  return { logIn: logInAsync, logOut };
};

export { useAuth };
