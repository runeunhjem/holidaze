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
import EditVenueModal from "../../components/EditVenueModal";
import { deleteVenue } from "../../utils/deleteVenue.js";
import VenueDeletedSnackbar from "../../components/VenueDeletedSnackbar";
import useStore from "../../hooks/useStore";

function BookingDetailsPage() {
  const { id } = useParams(); // Booking ID from URL
  const [booking, setBooking] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
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
        console.log("Booking details:", data.data);
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

  const handleEditOpen = () => {
    setEditModalOpen(true);
  };

  // const handleDelete = async () => {
  //   try {
  //     await deleteVenue(venue.id, accessToken);
  //     navigate(`/profile/${encodeURIComponent(venue.owner.name)}`);
  //   } catch (error) {
  //     console.error("Failed to delete venue:", error);
  //   }
  // };
  const handleDelete = async () => {
    try {
      await deleteVenue(id, accessToken);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate(`/profile/${encodeURIComponent(userDetails?.name)}`);
      }, 3000);
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleVenueUpdated = (updatedVenue) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      venue: updatedVenue,
    }));
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Booking for {venue.name || "N/A"}
      </h1>
      <ImageGallery
        media={venue.media || []}
        countryName={venue.location.country || "Unspecified country"}
        continent={venue.location.continent || "Unspecified continent"}
        venue={venue}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        venueOwner={isOwner}
      />
      <VenueDeletedSnackbar
        open={showSuccessAlert}
        message="Venue deleted successfully!"
        onClose={() => setShowSuccessAlert(false)}
      />

      <VenueLocationSection
        location={venue.location}
        description={venue.description}
      />
      <VenueDetailsSection venue={venue} />

      <div className="mt-6 space-y-2">
        <p>
          <strong>Booked from:</strong>{" "}
          {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
          {new Date(booking.dateTo).toLocaleDateString()}
        </p>

        <p>
          <strong>Booked by:</strong>{" "}
          {booking.customer?.name || "Unspecified name"}
        </p>
      </div>
      <VenueManagerSection
        owner={venue.owner}
        created={venue.created}
        updated={venue.updated}
      />

      <EditVenueModal
        open={editModalOpen}
        onClose={handleEditClose}
        onVenueUpdated={handleVenueUpdated}
        currentVenue={venue}
      />
    </div>
  );
}

export default BookingDetailsPage;
