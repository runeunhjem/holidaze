import { useEffect, useState } from "react";
import MyFavoriteVenues from "../../components/MyFavoriteVenues";
import { ClipLoader } from "react-spinners";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";

function MyFavoritesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Your Favorite Destinations",
      "Explore your favorite picks of destinations from around the world and choose your special place.",
    );
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="mt-12 flex h-full w-full flex-col items-center justify-center">
        <ClipLoader color="var(--link-color)" loading={loading} size={50} />
        <p className="mt-4">Loading your favorite venues...</p>
      </div>
    );
  }

  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Your Dream Destinations
      </h1>
      <MyFavoriteVenues />
    </div>
  );
}

export default MyFavoritesPage;
