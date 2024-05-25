import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import MyVenues from "../../components/MyVenues";
import { ClipLoader } from "react-spinners"; // Import the spinner
import { setTitleAndMeta } from "../../utils/setTitleAndMeta"; // Import the utility function

function MyVenuesPage() {
  const { viewedProfile } = useStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Your Beautiful Venues",
      "Quick overview of all the beautiful venues you have created.",
    );
    setLoading(false); // Set loading to false after the initial setup
  }, []);

  if (loading) {
    return (
      <div className="mt-12 flex h-full w-full flex-col items-center justify-center">
        <ClipLoader color="var(--link-color)" loading={loading} size={50} />
        <p className="mt-4">Loading your venues...</p>
      </div>
    );
  }

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
