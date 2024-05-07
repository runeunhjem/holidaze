import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

function NavigationManager() {
  const navigate = useNavigate();
  const { userDetails, justLoggedIn, resetJustLoggedIn, viewedProfile } = useStore();

  useEffect(() => {
    if (justLoggedIn && userDetails.name && viewedProfile.venues) {
      navigate(`/profile/${encodeURIComponent(userDetails.name)}`);
      resetJustLoggedIn();
    }
  }, [userDetails.name, justLoggedIn, navigate, resetJustLoggedIn, viewedProfile.venues]);

  return null;
}

export default NavigationManager;
