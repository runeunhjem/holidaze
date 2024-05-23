import { useEffect } from "react";
import useStore from "../../hooks/useStore";
import MyBookings from "../../components/MyBookings";

function MyBookingsPage() {
  const { viewedProfile } = useStore();

  useEffect(() => {
    document.title = "Holidaze - Your Bookings";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Explore your booked destinations from around the world and look forward to your stay in that special place.",
    );
  }, []);

  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
        Your Upcoming Stays
      </h1>
      <MyBookings viewedProfile={viewedProfile} />{" "}
      {/* Pass the viewedProfile prop */}
    </div>
  );
}

export default MyBookingsPage;
