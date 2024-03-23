// hooks/useAuth.js
import { useStore } from "./useStore";
import { fetchApi } from "../utils/fetchApi";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const setAccessToken = useStore((state) => state.setAccessToken);
  const clearAccessToken = useStore((state) => state.clearAccessToken);

  const logIn = async (credentials) => {
    try {
      const data = await fetchApi("loginEndpoint", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      setAccessToken(data.accessToken);
      // Further actions on successful login
      Navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logOut = () => {
    clearAccessToken();
    Navigate("/");
  };

  return { logIn, logOut };
};

export default useAuth;
