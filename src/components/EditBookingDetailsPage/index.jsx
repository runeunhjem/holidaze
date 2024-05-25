import PropTypes from "prop-types";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../pages/VenueDetailsPage/index.css";
import "./index.css";
import AddMissingFormLabelsToMUI from "../../utils/addMissingFormLabelsToMUI";

const EditBookingDetailsPage = ({
  booking,
  nights,
  totalPrice,
  onSave,
  onCancel,
}) => {
  const [startDate, setStartDate] = useState(new Date(booking.dateFrom));
  const [endDate, setEndDate] = useState(new Date(booking.dateTo));
  const [guests, setGuests] = useState(booking.guests);

  const isDateBooked = (date) => {
    return booking.venue.bookings?.some((b) => {
      if (booking && b.id === booking.id) return false; // Ignore the current booking
      const fromDate = new Date(b.dateFrom);
      const toDate = new Date(b.dateTo);
      return date >= fromDate && date <= toDate;
    });
  };

  const filterDate = (date) => {
    const today = new Date();
    return (
      date >= today &&
      (!isDateBooked(date) ||
        (booking &&
          new Date(booking.dateFrom) <= date &&
          date <= new Date(booking.dateTo)))
    );
  };

  const handleStartDateChange = (date) => {
    if (date && (!endDate || date <= endDate)) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date && (!startDate || date >= startDate)) {
      setEndDate(date);
    }
  };

  const handleGuestsChange = (e) => {
    const value = Number(e.target.value);
    if (value > booking.venue.maxGuests) {
      setGuests(booking.venue.maxGuests);
    } else {
      setGuests(value);
    }
  };

  const handleSave = () => {
    onSave({
      ...booking,
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests,
    });
  };

  return (
    <div
      className="book-now-container mt-8 space-y-4 rounded border p-4"
      style={{
        backgroundColor: "var(--header-bg-color)",
      }}
    >
      <AddMissingFormLabelsToMUI />
      <p className="w-full text-center text-lg font-bold">
        Edit Booking Details:
      </p>
      <div className="mx-auto flex w-full flex-col items-center space-y-2 sm:px-16 md:w-1/2 md:px-0">
        <div className="flex w-full justify-between">
          <strong>Check-in date:</strong>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            className="book-now-inputs cursor-pointer rounded border p-2"
            filterDate={filterDate}
          />
        </div>
        <div className="flex w-full justify-between">
          <strong>Check-out date:</strong>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            className="book-now-inputs cursor-pointer rounded border p-2"
            filterDate={filterDate}
            minDate={startDate} // Ensure end date is not before start date
          />
        </div>
        <div className="flex w-full justify-between">
          <strong>Guests:</strong>
          <input
            type="number"
            value={guests}
            onChange={handleGuestsChange}
            min="1"
            max={booking.venue.maxGuests}
            className="book-now-inputs rounded border p-2 pe-0 text-center"
          />
        </div>
        <div className="flex w-full justify-between pe-14">
          <strong>Nights:</strong>
          <p>{nights}</p>
        </div>
        <div className="flex w-full justify-between pe-14">
          <strong>Total price:</strong>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-12">
        <button
          className="flex items-center gap-2 text-green-500"
          onClick={handleSave}
        >
          <FaSave /> Save
        </button>
        <button
          className="flex items-center gap-2 text-red-500"
          onClick={onCancel}
        >
          <FaTimes /> Cancel
        </button>
      </div>
    </div>
  );
};

EditBookingDetailsPage.propTypes = {
  booking: PropTypes.object.isRequired,
  nights: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditBookingDetailsPage;
