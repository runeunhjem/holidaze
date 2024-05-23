import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../utils/getBookingById";
import useAccessToken from "../../hooks/useAccessToken";
import ImageGallery from "../../components/ImageGallery";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta"; // Import the utility function
import "../VenueDetailsPage/index.css"; // Import the CSS from VenueDetailsPage

function BookingDetailsPage() {
  const { id } = useParams(); // Booking ID from URL
  const [booking, setBooking] = useState(null); // State to store booking details
  const accessToken = useAccessToken(); // Retrieve accessToken securely

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const { data, error } = await getBookingById(id, accessToken); // Explicitly pass token
      if (error) {
        console.error("Failed to fetch booking details:", error);
      } else {
        setBooking(data.data);
        setTitleAndMeta(
          `Booking for ${data.data.venue?.name || "Venue"}`,
          `Details of your booking at ${data.data.venue?.name || "the venue"}.`,
        );
      }
    };

    fetchBookingDetails();
  }, [id, accessToken]);

  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  const venue = booking.venue || {};

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Booking for {venue.name || "N/A"}
      </h1>
      <ImageGallery
        media={venue.media || []}
        countryName={venue.location?.country ?? "Unspecified Country"}
        continent={venue.location?.continent ?? "Unspecified Continent"}
        venue={venue}
      />

      <div className="mt-6 space-y-2">
        <p>
          <strong>Description:</strong>{" "}
          {venue.description || "Description not available."}
        </p>
        <p>
          <strong>Price:</strong> ${venue.price ?? "N/A"}
        </p>
        <p>
          <strong>Max Guests:</strong> {venue.maxGuests ?? "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {venue.rating ?? 0} stars
        </p>

        <p>
          <strong>Booked from:</strong>{" "}
          {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
          {new Date(booking.dateTo).toLocaleDateString()}
        </p>

        <p>
          <strong>Booked by:</strong>{" "}
          {booking.customer?.name || "Unspecified name"}
        </p>

        <div>
          <strong>Amenities:</strong>
          <ul>
            {venue.meta?.wifi && <li>Wi-Fi</li>}
            {venue.meta?.parking && <li>Parking</li>}
            {venue.meta?.breakfast && <li>Breakfast</li>}
            {venue.meta?.pets && <li>Pets Allowed</li>}
          </ul>
        </div>

        <div>
          <strong>Location:</strong>
          <p>
            {venue.location?.address ?? ""}, {venue.location?.city ?? ""},{" "}
            {venue.location?.zip ?? ""}, {venue.location?.country ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsPage;
