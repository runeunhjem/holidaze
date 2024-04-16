import useStore from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useStore((state) => state.isAuthenticated);

  const setAccessToken = useStore((state) => state.setAccessToken);
  const clearAccessToken = useStore((state) => state.clearAccessToken);

  const logIn = async (credentials) => {
    try {
      const data = await fetchApi("v1Login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      setAccessToken(data.accessToken);
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      throw error; // Let the calling function handle the error
    }
  };

  const logOut = () => {
    clearAccessToken();
    navigate("/");
  };

  return { logIn, logOut };
};

export default useAuth;
