import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import { deleteVenue } from "../../utils/deleteVenue";
import { createBooking } from "../../utils/createBooking";
import { updateBooking } from "../../utils/updateBooking";
import { deleteBooking } from "../../utils/deleteBooking";
import { sanitizeFields } from "../../utils/options";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import EditVenueModal from "../../components/EditVenueModal";
import useStore from "../../hooks/useStore";
import BookNowModal from "../../components/BookNowModal";
import EditBookingModal from "../../components/EditBookingModal";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";
import "./index.css";
import VerticalSlider from "../../components/VerticalSlider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import VenueLocationSection from "../../components/VenueLocationSection";
import VenueDetailsSection from "../../components/VenueDetailsSection";
import VenueManagerSection from "../../components/VenueManagerSection";
import VenueDeletedSnackbar from "../../components/VenueDeletedSnackbar";

function VenueDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    accessToken,
    userDetails,
    isAuthenticated,
    viewedProfile,
    setViewedProfile,
  } = useStore();
  const [venue, setVenue] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [venueOwner, setVenueOwner] = useState(false);
  const [guestsInput, setGuestsInput] = useState("1");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNights, setTotalNights] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showBookingSuccessAlert, setShowBookingSuccessAlert] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editBookingModalOpen, setEditBookingModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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

  useEffect(() => {
    if (venue) {
      setTitleAndMeta(
        `Holidaze - ${venue.name || "Venue Details"}`,
        venue.description || "Explore this beautiful venue on Holidaze.",
      );
    }
  }, [venue]);

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
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate(`/profile/${encodeURIComponent(userDetails?.name)}`);
      }, 3000);
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  const updateViewedProfileBookings = (updatedBookings) => {
    if (viewedProfile && viewedProfile.bookings) {
      setViewedProfile({
        ...viewedProfile,
        bookings: updatedBookings,
      });
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
    const today = new Date();

    if (start < today || (end && end < today) || isRangeBooked(start, end)) {
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
        setDatePickerOpen(false);
      } else {
        setTotalPrice(0);
        setTotalNights(0);
      }
    }
  };

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    if (
      value === "" ||
      (parseInt(value, 10) >= 1 && parseInt(value, 10) <= venue.maxGuests)
    ) {
      setGuestsInput(value);
    }
  };

  const handleGuestsBlur = () => {
    let finalGuests = parseInt(guestsInput, 10);
    if (isNaN(finalGuests) || finalGuests < 1) {
      finalGuests = 1;
    }
    setGuests(finalGuests);
    setGuestsInput(finalGuests.toString());
  };

  const handleGuestsChangeInModal = (e) => {
    const value = e.target.value;
    if (
      value === "" ||
      (parseInt(value, 10) >= 1 && parseInt(value, 10) <= venue.maxGuests)
    ) {
      setGuestsInput(value);
      setGuests(parseInt(value, 10));
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
      setShowBookingSuccessAlert(true);
      const newBooking = {
        ...data.data,
        customer: { name: userDetails.name },
      };
      const updatedBookings = [...venue.bookings, newBooking];
      setVenue((prevVenue) => ({
        ...prevVenue,
        bookings: updatedBookings,
      }));
      updateViewedProfileBookings(updatedBookings);
      setTimeout(() => {
        setShowBookingSuccessAlert(false);
      }, 4000);
    } else {
      console.error("Booking failed:", error);
    }
  };

  const handleEditBookingOpen = (booking) => {
    setSelectedBooking(booking);
    setStartDate(new Date(booking.dateFrom));
    setEndDate(new Date(booking.dateTo));
    setGuests(booking.guests);
    setGuestsInput(booking.guests.toString());
    setEditBookingModalOpen(true);
  };

  const handleEditBookingClose = () => {
    setSelectedBooking(null);
    setEditBookingModalOpen(false);
  };

  const handleDeleteBookingOpen = (booking) => {
    setSelectedBooking(booking);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteBookingClose = () => {
    setSelectedBooking(null);
    setConfirmDeleteOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBooking) return;

    const { error } = await deleteBooking(selectedBooking.id, accessToken);

    if (!error) {
      const updatedBookings = venue.bookings.filter(
        (booking) => booking.id !== selectedBooking.id,
      );
      setVenue((prevVenue) => ({
        ...prevVenue,
        bookings: updatedBookings,
      }));
      updateViewedProfileBookings(updatedBookings);
      handleDeleteBookingClose();
    } else {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleUpdateBooking = async (updatedBooking) => {
    const { dateFrom, dateTo, guests, customer } = updatedBooking;

    const today = new Date();
    const finalDateFrom =
      dateFrom instanceof Date ? dateFrom : new Date(dateFrom);
    const finalDateTo = dateTo instanceof Date ? dateTo : new Date(dateTo);

    if (finalDateFrom < today) {
      finalDateFrom.setDate(today.getDate());
    }

    const updatedDetails = {
      dateFrom: finalDateFrom.toISOString(),
      dateTo: finalDateTo.toISOString(),
      guests,
    };

    const { data, error } = await updateBooking(
      selectedBooking.id,
      updatedDetails,
      accessToken,
    );

    if (data) {
      const updatedBookings = venue.bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? { ...data.data, customer }
          : booking,
      );
      setVenue((prevVenue) => ({
        ...prevVenue,
        bookings: updatedBookings,
      }));
      updateViewedProfileBookings(updatedBookings);
      handleEditBookingClose();
    } else {
      console.error("Failed to update booking:", error);
    }
  };

  const userActiveBookings = venue.bookings
    ? venue.bookings
        .filter(
          (booking) =>
            booking.customer?.name === userDetails.name &&
            new Date(booking.dateTo) >= new Date(),
        )
        .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
    : [];

  const renderDayContents = (day, date) => {
    if (isDateBooked(date)) {
      return <span className="booked-date">{day}</span>;
    }
    return day;
  };

  return (
    <div className="venue-details mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        {venue.name || "Venue name not provided"}
      </h1>
      <div className="relative">
        {" "}
        {/* Added this div to position the Snackbar */}
        <ImageGallery
          media={venue.media || []}
          countryName={venue.location.country || "Unspecified country"}
          continent={venue.location.continent || "Unspecified continent"}
          venue={venue}
          onEdit={handleEditOpen}
          onDelete={handleDelete}
          venueOwner={venueOwner}
        />
        {/* <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          onClose={() => setShowSuccessAlert(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <div className="overlay-success-alert">
            {" "}
            Venue deleted successfully!
          </div>
        </Snackbar> */}
        <VenueDeletedSnackbar
          open={showSuccessAlert}
          message="Venue deleted successfully!"
          onClose={() => setShowSuccessAlert(false)}
        />
      </div>

      {/* Venue location-section */}
      <div className="mt-6 space-y-2">
        <VenueLocationSection
          location={venue.location}
          description={venue.description}
        />

        {/* Venue details-section */}
        <VenueDetailsSection venue={venue} />

        <VerticalSlider />

        {/* Book now-section */}
        {isAuthenticated && (
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
                    value={guestsInput}
                    onChange={handleGuestsChange}
                    onBlur={handleGuestsBlur}
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
            {showBookingSuccessAlert && (
              <div className="success-alert">Booking successful!</div>
            )}
          </div>
        )}

        {/* Active bookings-section */}

        {userActiveBookings && userActiveBookings.length > 0 && (
          <div className="active-bookings-container manager-container !my-4 flex w-full max-w-1200 flex-col items-center justify-start gap-4 rounded-lg py-4 md:justify-around">
            <h2
              className="my-0 py-0 text-2xl font-bold"
              style={{
                fontSize: "calc(1rem + 0.6vw)",
              }}
            >
              My Active Bookings ({userActiveBookings.length})
            </h2>
            <div className="w-full px-4">
              <ul className="flex w-full flex-wrap gap-2">
                {userActiveBookings.map((booking, index) => (
                  <li
                    key={index}
                    className="bookings-list active-bookings-container flex w-full flex-col items-start justify-center p-2 md:flex-row md:items-center md:justify-evenly"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
                      <Link
                        to={`/bookings/${booking.id}`}
                        className="header-nav-links flex flex-wrap rounded text-start"
                        style={{
                          color: "var(--link-color)",
                        }}
                      >
                        <span className="me-4">
                          Your ref: {booking.id.slice(0, 4)}
                        </span>
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
                      <span className="flex justify-start">
                        Guests: {booking.guests}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row md:items-center md:gap-2">
                      <span className="flex w-40 justify-start">
                        Ordered:{" "}
                        {new Date(booking.created).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span className="flex w-40 justify-start">
                        Updated:{" "}
                        {new Date(booking.updated).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span className="mt-2 flex w-14 justify-between md:mt-0">
                        <FaEdit
                          className="booked-icons ml-2 cursor-pointer"
                          onClick={() => handleEditBookingOpen(booking)}
                        />
                        <FaTrashAlt
                          className="booked-icons ml-2 cursor-pointer"
                          onClick={() => handleDeleteBookingOpen(booking)}
                        />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Check availability-section */}
        <div className="details-container !mt-4">
          {/* Booking left side -section */}
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
                filterDate={(date) => date >= new Date() && !isDateBooked(date)}
                monthsShown={windowWidth >= 768 ? 2 : 1}
                renderDayContents={renderDayContents}
              />
            </div>
          </div>

          {/* Booking right side -section */}
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

        {/* Manager-section */}
        <VenueManagerSection
          owner={venue.owner}
          created={venue.created}
          updated={venue.updated}
        />
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
            filterDate={(date) => date >= new Date() && !isDateBooked(date)}
            monthsShown={2}
            renderDayContents={renderDayContents}
          />
        </BookNowModal>
      )}

      <EditBookingModal
        open={editBookingModalOpen}
        onClose={handleEditBookingClose}
        booking={selectedBooking}
        startDate={startDate}
        endDate={endDate}
        guests={guests}
        handleDateChange={handleDateChange}
        handleGuestsChange={handleGuestsChangeInModal}
        handleUpdateBooking={handleUpdateBooking}
        userDetails={userDetails}
        venue={venue}
      />

      <Dialog open={confirmDeleteOpen} onClose={handleDeleteBookingClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this booking?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteBookingClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VenueDetailsPage;
