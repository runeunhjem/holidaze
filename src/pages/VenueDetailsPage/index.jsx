import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import { deleteVenue } from "../../utils/deleteVenue";
import { MdFastfood, MdLocationPin, MdPets } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { FiWifi } from "react-icons/fi";
import { TbParking } from "react-icons/tb";
import { sanitizeFields } from "../../utils/options";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultAvatarImage from "../../assets/images/default-profile-image.png";
import EditVenueModal from "../../components/EditVenueModal";
import useStore from "../../hooks/useStore";
import "./index.css";

function VenueDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken, userDetails } = useStore();
  const [venue, setVenue] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [venueOwner, setVenueOwner] = useState(false);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      const { data, error } = await getVenueById(id);
      if (error) {
        console.error("Failed to fetch venue details:", error);
      } else if (data && data.data) {
        data.data.location.country = sanitizeFields(data.data.location.country);
        data.data.location.continent = sanitizeFields(
          data.data.location.continent,
        );
        setVenue(data.data);
      }
    };

    fetchVenueDetails();
  }, [id]);

  useEffect(() => {
    if (venue && userDetails) {
      setVenueOwner(userDetails.name === venue.owner?.name);
    }
  }, [venue, userDetails]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleVenueUpdated = (updatedVenue) => {
    setVenue(updatedVenue);
  };

  const handleDelete = async () => {
    try {
      await deleteVenue(id, accessToken);
      navigate(`/profile/${encodeURIComponent(venue.owner?.name)}`); // Redirect to the home page or another page after deletion
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  const isDateBooked = (date) => {
    return venue.bookings?.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return date >= fromDate && date <= toDate;
    });
  };

  const isRangeBooked = (start, end) => {
    return venue.bookings?.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return (
        (start <= fromDate && end >= fromDate) ||
        (start >= fromDate && start <= toDate) ||
        (start <= fromDate && end >= toDate)
      );
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (isRangeBooked(start, end)) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  const renderDayContents = (day, date) => {
    if (isDateBooked(date)) {
      return <span className="booked-date">{day}</span>;
    }
    return day;
  };

  const getAvatarUrl = (avatarUrl) => {
    if (!avatarUrl || avatarUrl === "https://url.com/image.jpg") {
      return defaultAvatarImage;
    }
    return avatarUrl;
  };

  return (
    <div className="venue-details mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        {venue.name || "Venue"}
      </h1>
      <ImageGallery
        media={venue.media || []}
        countryName={venue.location.country || "Unspecified"}
        continent={venue.location.continent || "Unspecified"}
        venue={venue}
        onEdit={handleEditOpen} // Pass down the handler
        onDelete={handleDelete} // Pass down the handler
        venueOwner={venueOwner} // Pass down the venueOwner
      />

      <div className="mt-6 space-y-2">
        <div className="mb-3 flex align-middle">
          <MdLocationPin className="mr-2 text-2xl text-red-500" />
          <p className="font-bold tracking-wide">
            {venue.location.address}, {venue.location.zip}{" "}
            {venue.location.city || "Unspecified city"},{" "}
            {venue.location.country || "Unspecified country"}
          </p>
        </div>
        <hr />
        <p className="py-3 tracking-wider">
          {venue.description || "No description provided."}
        </p>

        <div className="details-container">
          <div className="details-left">
            <p
              className="font-bold"
              style={{
                color: "var(--profile-text-color)",
              }}
            >
              Details:
            </p>
            <ul className="details-list">
              <li>
                <strong>Price:</strong> ${venue.price || "N/A"} / night
              </li>
              <li>
                <strong>Max Guests:</strong> {venue.maxGuests || "N/A"}
              </li>
              <li className="flex align-top">
                <strong>Rating:</strong>{" "}
                <RiStarSFill className="mt-0.3 inline text-xl text-yellow-500" />
                {venue.rating || "No rating"} stars
              </li>
            </ul>
          </div>

          {venue.meta && (
            <div className="details-right">
              <p
                className="font-bold"
                style={{
                  color: "var(--profile-text-color)",
                }}
              >
                Amenities:
              </p>
              <ul className="amenities-list">
                {venue.meta.wifi && (
                  <li className="flex">
                    <FiWifi className="amenities me-3 text-xl" />
                    Free Wi-Fi
                  </li>
                )}
                {venue.meta.parking && (
                  <li className="flex">
                    <TbParking className="amenities me-3 text-xl" />
                    Free Parking
                  </li>
                )}
                {venue.meta.breakfast && (
                  <li className="flex">
                    <MdFastfood className="amenities me-3 text-xl" />
                    Breakfast included
                  </li>
                )}
                {venue.meta.pets && (
                  <li className="flex">
                    <MdPets className="amenities me-3 text-xl" />
                    Pets Allowed
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="details-container">
          <div className="booking-left">
            <p
              className="booking-title font-bold"
              style={{
                color: "var(--profile-text-color)",
              }}
            >
              Check availability:
            </p>
            <div className="datepicker-container">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                filterDate={(date) => !isDateBooked(date)}
                monthsShown={windowWidth >= 768 ? 2 : 2}
                renderDayContents={renderDayContents}
              />
            </div>
          </div>
          <div className="booking-right">
            <p
              className="booking-title font-bold"
              style={{
                color: "var(--profile-text-color)",
              }}
            >
              Booked Dates
            </p>
            {venue.bookings && venue.bookings.length > 0 ? (
              <ul className="booked-list">
                {venue.bookings.map((booking, index) => (
                  <li key={index}>
                    {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings yet</p>
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--header-bg-color)",
            color: "var(--profile-text-color)",
          }}
          className="manager-container flex w-full max-w-1200 flex-wrap items-center justify-around rounded-lg py-4"
        >
          <div className="manager-avatar flex items-center">
            <img
              src={getAvatarUrl(venue?.owner?.avatar?.url)}
              alt="Illustration of the Manager's avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "1px 2px 4px var(--link-color)",
              }}
            />
            <p className="ms-3 flex flex-col">
              <strong>Venue is managed by</strong>{" "}
              <Link
                className="header-nav-links rounded"
                to={`/profile/${encodeURIComponent(venue?.owner?.name)}`}
              >
                {venue?.owner?.name}
              </Link>
            </p>
          </div>
          <div className="ms-3 flex flex-col">
            <span className="ms-3 flex justify-between">
              <strong className="me-2">Venue Added:</strong>{" "}
              {new Date(venue.created).toLocaleDateString()}
            </span>
            <span className="ms-3 flex justify-between">
              <strong className="me-2">Venue Updated:</strong>{" "}
              {new Date(venue.updated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <EditVenueModal
        open={editModalOpen}
        onClose={handleEditClose}
        onVenueUpdated={handleVenueUpdated}
        currentVenue={venue}
      />
    </div>
  );
}

export default VenueDetailsPage;
