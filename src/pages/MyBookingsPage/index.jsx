import { useEffect } from "react";

function MyBookingsPage() {

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
      "Explore our wide range of destinations from around the world to find your special place."
    );
  }, []);

  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">My bookings overview</h1>
      <p className="mb-4">
        Bookings here
      </p>
      <p>
        With images and details
      </p>
    </div>
  );
}

export default MyBookingsPage;
