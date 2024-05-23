import { useEffect } from "react";
import MyFavoriteVenues from "../../components/MyFavoriteVenues";

function MyFavoritesPage() {
  useEffect(() => {
    document.title = "Holidaze - Your Favorite Destinations";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Explore your favorite picks of destinations from around the world and choose your special place.",
    );
  }, []);

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
