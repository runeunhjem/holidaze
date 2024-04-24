import { useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
import useStore from "./useStore";

const useAuth = () => {
  const navigate = useNavigate();
  const { logIn, clearUser } = useStore();

  const logInAsync = async (credentials) => {
    try {
      const response = await fetchApi("login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      const data = await response.data; // Assuming your fetchApi handles the JSON parsing
      if (data.accessToken && data.name) {
        // Use the logIn function from useStore to manage all state updates
        logIn({
          username: data.name,
          name: data.name,
          email: data.email,
          bio: data.bio,
          avatar: data.avatar,
          banner: data.banner,
        });
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
    clearUser();
    navigate("/");
  };

  return { logIn: logInAsync, logOut };
};

export { useAuth };
