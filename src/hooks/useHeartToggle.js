import { useState, useEffect } from "react";
import useStore from "./useStore";

function useHeartToggle(viewedProfile) {
  const { favoriteProfiles, addFavoriteProfile, removeFavoriteProfile } =
    useStore();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (viewedProfile?.name) {
      const isFav = favoriteProfiles.some((p) => p.name === viewedProfile.name);
      setIsFavorite(isFav);
    }
  }, [viewedProfile, favoriteProfiles]);

  const toggleHeart = () => {
    if (isFavorite) {
      removeFavoriteProfile(viewedProfile.name); // Remove by name
    } else {
      addFavoriteProfile(viewedProfile); // Directly add to favorites
    }
    setIsFavorite(!isFavorite); // Toggle internal state
  };

  return { isFavorite, toggleHeart };
}

export default useHeartToggle;