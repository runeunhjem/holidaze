import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditBookingModal({
  open,
  onClose,
  booking,
  startDate,
  endDate,
  guests,
  handleDateChange,
  handleUpdateBooking,
  userDetails,
  venue,
}) {
  const renderDayContents = (day, date) => {
    if (
      booking &&
      new Date(booking.dateFrom) <= date &&
      date <= new Date(booking.dateTo)
    ) {
      return <span className="booked-date">{day}</span>;
    }
    return day;
  };

  const handleSave = () => {
    // Ensure both startDate and endDate are set and valid dates
    const finalStartDate = startDate ? new Date(startDate) : new Date();
    const finalEndDate = endDate ? new Date(endDate) : finalStartDate;

    // Ensure dateFrom is in the future
    const today = new Date();
    if (finalStartDate < today) {
      finalStartDate.setDate(today.getDate());
    }

    handleUpdateBooking({
      ...booking,
      dateFrom: finalStartDate,
      dateTo: finalEndDate,
      guests,
      customer: { name: userDetails.name },
    });
  };

  const isDateBooked = (date) => {
    return venue.bookings?.some((b) => {
      if (booking && b.id === booking.id) return false;
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Edit Booking
        <MdClose
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: "gray",
            fontSize: "24px",
          }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          width: "min-content",
          overflow: "hidden",
        }}
      >
        <DatePicker
          sx={{
            maxWidth: "100%",
          }}
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={new Date()}
          filterDate={filterDate}
          monthsShown={2}
          renderDayContents={renderDayContents}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditBookingModal.defaultProps = {
  booking: null,
  startDate: new Date(),
  endDate: new Date(),
};

EditBookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  booking: PropTypes.object,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired,
  handleUpdateBooking: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
};

export default EditBookingModal;
