import { useEffect } from "react";

function MyFavoritesPage() {
  useEffect(() => {
    document.title = "Holidaze - My Favorites";
  }, []);
  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">My favorites overview</h1>
      <p className="mb-4">Favorites here</p>
      <p>With images and details</p>
    </div>
  );
}

export default MyFavoritesPage;