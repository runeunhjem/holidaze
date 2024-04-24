import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

function NavigationManager() {
  const navigate = useNavigate();
  const { userDetails, justLoggedIn, resetJustLoggedIn } = useStore();

  useEffect(() => {
    if (justLoggedIn && userDetails.name) {
      navigate(`/profile/${encodeURIComponent(userDetails.name)}`);
      resetJustLoggedIn();
    }
  }, [userDetails.name, justLoggedIn, navigate, resetJustLoggedIn]);

  return null;
}

export default NavigationManager;
