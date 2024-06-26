import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import MyBookings from "../../components/MyBookings";
import { ClipLoader } from "react-spinners";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";

function MyBookingsPage() {
  const { viewedProfile } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Your Bookings",
      "Explore your booked destinations from around the world and look forward to your stay in that special place.",
    );
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <ClipLoader color="var(--link-color)" loading={loading} size={50} />
        <p className="mt-4">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Your Upcoming Stays
      </h1>
      <MyBookings viewedProfile={viewedProfile} />{" "}
    </div>
  );
}

export default MyBookingsPage;
