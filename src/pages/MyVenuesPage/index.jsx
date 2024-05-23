// MyVenuesPage.jsx
import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import MyVenues from "../../components/MyVenues";

function MyVenuesPage() {
  const { viewedProfile } = useStore();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "Holidaze - Your Beautiful Venues";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Quick overview of all the beautiful venues you have created.",
    );
  }, []);

  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Your Beautiful Venues
      </h1>
      <MyVenues
        viewedProfile={viewedProfile}
        refreshKey={refreshKey}
        setRefreshKey={setRefreshKey}
      />
    </div>
  );
}

export default MyVenuesPage;
