import { useNavigate } from "react-router-dom";
import useStore from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../constants/api";
import { save } from "../utils/storage";

const useAuth = () => {
  const navigate = useNavigate();
  const { logIn, clearUser, setAccessToken } = useStore();

  const endpoint = `${ENDPOINTS.login}?${PARAMS._bookings}`;
  const logInAsync = async (credentials) => {
    try {
      const response = await fetchApi(endpoint, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      const data = response.data;
      if (data.accessToken && data.name) {
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
    save("accessToken", null);
    clearUser();
    navigate("/");
  };

  return { logIn: logInAsync, logOut };
};

export { useAuth };
