import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBookingById } from "../../utils/getBookingById";
import useAccessToken from "../../hooks/useAccessToken"; // Custom hook for access token retrieval
import ImageGallery from "../../components/ImageGallery";

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
        console.log("Booking fetched:", data);
      }
    };

    fetchBookingDetails();
  }, [id, accessToken]); // Add `accessToken` to dependency array

  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  const venue = booking.venue;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Booking for {venue.name}</h1>
      <ImageGallery media={venue.media} venue={venue} />

      <div className="mt-6 space-y-2">
        <p><strong>Description:</strong> {venue.description}</p>
        <p><strong>Price:</strong> ${venue.price}</p>
        <p><strong>Max Guests:</strong> {venue.maxGuests}</p>
        <p><strong>Rating:</strong> {venue.rating} stars</p>

        <p>
          <strong>Booked from:</strong> {new Date(booking.dateFrom).toLocaleDateString()} to {new Date(booking.dateTo).toLocaleDateString()}
        </p>

        <p><strong>Booked by:</strong> {booking.customer.name}</p>

        <div>
          <strong>Amenities:</strong>
          <ul>
            {venue.meta.wifi && <li>Wi-Fi</li>}
            {venue.meta.parking && <li>Parking</li>}
            {venue.meta.breakfast && <li>Breakfast</li>}
            {venue.meta.pets && <li>Pets Allowed</li>}
          </ul>
        </div>

        <div>
          <strong>Location:</strong>
          <p>{venue.location.address}, {venue.location.city}, {venue.location.zip}, {venue.location.country}</p>
        </div>

        <div className="mt-6" style={{ height: "350px" }}>
          <h2 className="text-2xl font-bold">Check Availability</h2>
          <DatePicker
            inline
            monthsShown={2}
            highlightDates={[{ start: new Date(booking.dateFrom), end: new Date(booking.dateTo) }]}
            dayClassName={(date) => {
              return date >= new Date(booking.dateFrom) && date <= new Date(booking.dateTo)
                ? "react-datepicker__day--highlighted"
                : "";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsPage;
