import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
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
  handleGuestsChange,
  handleUpdateBooking,
  userDetails,
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
    const finalEndDate = endDate || startDate; // Set endDate to startDate if endDate is null
    handleUpdateBooking({
      ...booking,
      dateFrom: startDate,
      dateTo: finalEndDate,
      guests,
      customer: { name: userDetails.name },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Booking</DialogTitle>
      <DialogContent
        sx={{
          width: "minContent",
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
          renderDayContents={renderDayContents}
        />
        <TextField
          margin="dense"
          label="Guests"
          type="number"
          fullWidth
          value={guests}
          onChange={handleGuestsChange}
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
  guests: 0,
};

EditBookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  booking: PropTypes.object,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  guests: PropTypes.number,
  handleDateChange: PropTypes.func.isRequired,
  handleGuestsChange: PropTypes.func.isRequired,
  handleUpdateBooking: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
};

export default EditBookingModal;
