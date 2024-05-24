// src/pages/BookingDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../../utils/getBookingById";
import useAccessToken from "../../hooks/useAccessToken";
import ImageGallery from "../../components/ImageGallery";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";
import "../VenueDetailsPage/index.css";
import VenueLocationSection from "../../components/VenueLocationSection";
import VenueDetailsSection from "../../components/VenueDetailsSection";
import VenueManagerSection from "../../components/VenueManagerSection";
import { deleteBooking } from "../../utils/deleteBooking";
import VenueDeletedSnackbar from "../../components/VenueDeletedSnackbar";
import useStore from "../../hooks/useStore";
import GoogleMap from "../../components/GoogleMap";
import BookingInfo from "../../components/BookingInfo";
import EditBookingDetailsPage from "../../components/EditBookingDetailsPage";

function BookingDetailsPage() {
  const { id } = useParams(); // Booking ID from URL
  const [booking, setBooking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const accessToken = useAccessToken(); // Retrieve accessToken securely
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { userDetails } = useStore();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const { data, error } = await getBookingById(id, accessToken);
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
  const isOwner = booking.customer?.name === venue.owner?.name;

  const handleEditBookingOpen = () => {
    setIsEditing(true);
  };

  const handleDeleteBookingOpen = async () => {
    try {
      await deleteBooking(booking.id, accessToken);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate(`/profile/${encodeURIComponent(userDetails?.name)}`);
      }, 3000);
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleEditBookingSave = (updatedBooking) => {
    setBooking(updatedBooking);
    setIsEditing(false);
  };

  const handleEditBookingCancel = () => {
    setIsEditing(false);
  };

  const nights = Math.ceil(
    (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
      (1000 * 60 * 60 * 24),
  );
  const totalPrice = booking.venue.price * nights;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Booking for {venue.name || "N/A"}
      </h1>
      <ImageGallery
        media={venue.media || []}
        countryName={venue.location.country || "Unspecified country"}
        continent={venue.location.continent || "Unspecified continent"}
        venue={venue}
      />
      <VenueDeletedSnackbar
        open={showSuccessAlert}
        message="Booking deleted successfully!"
        onClose={() => setShowSuccessAlert(false)}
      />

      <VenueLocationSection
        location={venue.location}
        description={venue.description}
      />
      <VenueDetailsSection venue={venue} />
      {isEditing ? (
        <EditBookingDetailsPage
          booking={booking}
          nights={nights}
          totalPrice={totalPrice}
          onSave={handleEditBookingSave}
          onCancel={handleEditBookingCancel}
        />
      ) : (
        <BookingInfo
          booking={booking}
          nights={nights}
          totalPrice={totalPrice}
          onEdit={handleEditBookingOpen}
          onDelete={handleDeleteBookingOpen}
        />
      )}
      <VenueManagerSection
        owner={venue.owner}
        created={venue.created}
        updated={venue.updated}
      />
    </div>
  );
}

export default BookingDetailsPage;
