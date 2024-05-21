import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import { deleteVenue } from "../../utils/deleteVenue";
import { createBooking } from "../../utils/createBooking"; // Import the createBooking function
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
import BookNowModal from "../../components/BookNowModal";
import "./index.css";
import VerticalSlider from "../../components/VerticalSlider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function VenueDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken, userDetails } = useStore();
  const [venue, setVenue] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [venueOwner, setVenueOwner] = useState(false);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNights, setTotalNights] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
      setTotalPrice(0);
      setTotalNights(0);
    } else {
      setStartDate(start);
      setEndDate(end);
      if (start && end) {
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setTotalPrice((nights * venue.price).toFixed(2));
        setTotalNights(nights);
        setDatePickerOpen(false); // Close the modal when both dates are selected
      } else {
        setTotalPrice(0);
        setTotalNights(0);
      }
    }
  };

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= venue.maxGuests) {
      setGuests(value);
    } else if (value > venue.maxGuests) {
      setGuests(venue.maxGuests);
    } else {
      setGuests(1);
    }
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      console.error("Please select both start and end dates.");
      return;
    }

    const bookingDetails = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests,
      venueId: id,
    };

    const { data, error } = await createBooking(bookingDetails, accessToken);

    if (data) {
      setShowSuccessAlert(true); // Show success alert
      const newBooking = {
        ...data.data,
        customer: { name: userDetails.name }, // Manually set the customer name
      };
      setVenue((prevVenue) => ({
        ...prevVenue,
        bookings: [...prevVenue.bookings, newBooking],
      }));
      setTimeout(() => {
        setShowSuccessAlert(false); // Hide success alert after 4 seconds
      }, 4000);
    } else {
      console.error("Booking failed:", error);
    }
  };

  const userActiveBookings = venue.bookings
    ? venue.bookings.filter(
        (booking) =>
          booking.customer?.name === userDetails.name &&
          new Date(booking.dateTo) >= new Date(),
      )
    : [];

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
        {venue.name || "Venue name not provided"}
      </h1>
      <ImageGallery
        media={venue.media || []}
        countryName={venue.location.country || "Unspecified country"}
        continent={venue.location.continent || "Unspecified continent"}
        venue={venue}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        venueOwner={venueOwner}
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
              <li className="flex w-full whitespace-nowrap align-top">
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

        <VerticalSlider />
        <div
          style={{
            backgroundColor: "var(--header-bg-color)",
            color: "var(--profile-text-color)",
          }}
          className="book-now-container manager-container !mt-4 flex w-full max-w-1200 flex-col items-center justify-start gap-4 rounded-lg py-4 md:justify-around"
        >
          <h2 className="my-0 py-0 text-2xl font-bold">Book Now</h2>
          <div className="book-now-content flex flex-wrap items-end gap-4 md:w-full md:flex-nowrap">
            <div className="book-now-dates mx-4 flex w-full flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col items-start">
                <label htmlFor="checkin-date">Check-in / Check-out:</label>
                <input
                  type="text"
                  id="checkin-date"
                  value={
                    startDate && endDate
                      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                      : "Select Dates"
                  }
                  readOnly
                  onClick={() => setDatePickerOpen(true)}
                  className="book-now-inputs cursor-pointer rounded border p-2"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="guests">Guests:</label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max={venue.maxGuests}
                  value={guests}
                  onChange={handleGuestsChange}
                  className="book-now-inputs rounded border p-2"
                />
              </div>
            </div>
            <div className="book-now-bottom mx-4 flex w-full flex-wrap justify-between gap-4 md:flex-nowrap">
              <div className="flex flex-col items-start">
                Nights:
                <br />
                <strong>
                  <p className="mt-1 text-2xl">{totalNights}</p>
                </strong>
              </div>
              <div className="flex flex-col items-start">
                Price:
                <br />
                <strong>
                  <p className="mt-1 text-2xl">${totalPrice}</p>
                </strong>
              </div>
              <button className="book-now-button" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
          {showSuccessAlert && (
            <div className="success-alert mt-4 p-2 text-green-700">
              Booking successful!
            </div>
          )}
        </div>

        {userActiveBookings && userActiveBookings.length > 0 && (
          <div
            className="bookings-list manager-container !my-4 flex w-full max-w-1200 flex-col items-center justify-start gap-4 rounded-lg py-4 md:justify-around"
          >
            <h2 className="my-0 py-0 text-2xl font-bold">
              My Active Bookings ({userActiveBookings.length})
            </h2>
            <div className="w-full px-4">
              <ul className="w-full flex flex-wrap gap-2">
                {userActiveBookings.map((booking, index) => (
                  <li
                    key={index}
                    className="flex w-full flex-wrap items-start justify-between gap-2 p-2 md:flex-row md:items-center"
                    style={{
                      outline: "1px solid var(--green-800)",
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <Link
                        to={`/bookings/${booking.id}`}
                        className="header-nav-links rounded flex flex-col md:flex-row items-start md:items-center md:gap-2"
                        style={{ color: "var(--link-color)" }}
                      >
                        <span>Your ref: {booking.id.slice(0, 4)}</span>
                        {` ${new Date(booking.dateFrom).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          },
                        )} to ${new Date(booking.dateTo).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          },
                        )}`}
                      </Link>
                      <span className="text-start">Guests: {booking.guests}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <span>
                        Ordered:{" "}
                        {new Date(booking.created).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span>
                        Updated:{" "}
                        {new Date(booking.updated).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span className="mt-2 flex justify-end md:mt-0">
                        <FaEdit className="booked-icons ml-2 cursor-pointer" />
                        <FaTrashAlt className="booked-icons ml-2 cursor-pointer" />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="details-container !mt-4">
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
                {venue.bookings
                  .filter((booking) => new Date(booking.dateTo) >= new Date())
                  .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
                  .map((booking, index) => (
                    <li key={index}>
                      {new Date(booking.dateFrom).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      to{" "}
                      {new Date(booking.dateTo).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      by{" "}
                      {booking.customer && booking.customer.name ? (
                        <Link
                          className="header-nav-links rounded"
                          to={`/profile/${encodeURIComponent(
                            booking.customer.name,
                          )}`}
                        >
                          {booking.customer.name}
                        </Link>
                      ) : (
                        "Unknown customer"
                      )}
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
          className="manager-container flex w-full max-w-1200 flex-wrap items-center justify-start gap-4 rounded-lg py-4 md:justify-around"
        >
          <div className="manager-avatar ms-3 flex items-center">
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
          <div className="flex flex-col md:ms-3">
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

      {datePickerOpen && (
        <BookNowModal onClose={() => setDatePickerOpen(false)}>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
            filterDate={(date) => !isDateBooked(date)}
            monthsShown={2}
            renderDayContents={renderDayContents}
          />
        </BookNowModal>
      )}
    </div>
  );
}

export default VenueDetailsPage;
