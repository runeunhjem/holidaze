// src/components/BookingInfo/index.jsx
import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BookingInfo = ({ booking, nights, totalPrice, onEdit, onDelete }) => {
  return (
    <div
      className="success-alert mt-8 space-y-4"
      style={
        {
          // backgroundColor: "var(--header-bg-color)",
        }
      }
    >
      <p className="flex flex-col">
        <span
          className="text-lg font-bold"
          style={{
            color: "var(--link-color)",
          }}
        >
          Dear HolidazeManager,
        </span>
        <span
          className="text-lg font-bold"
          style={{
            color: "var(--link-color)",
          }}
        >
          we are looking forward to seeing you soon.
        </span>
      </p>
      <p className="text-lg italic underline">Booking details:</p>
      <div className="flex w-full justify-between">
        <div className="flex w-full flex-wrap justify-between gap-4 lg:flex-nowrap">
          <div className="flex w-full justify-between sm:px-2 md:px-0 lg:justify-around">
            <div className="flex flex-col justify-between sm:flex-row">
              <p className="whitespace-nowrap">
                <strong>Check-in date:</strong>
              </p>
              <p className="text-start sm:ms-2">
                {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col justify-between sm:flex-row">
              <p className="whitespace-nowrap">
                <strong>Check-out date:</strong>
              </p>
              <p className="text-end sm:ms-2 sm:text-start">
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between sm:px-2 md:px-0 lg:justify-around">
            <div className="flex flex-col justify-between sm:flex-row">
              <p>
                <strong>Guests:</strong>
              </p>
              <p className="sm:ms-2">{booking.guests}</p>
            </div>
            <div className="flex flex-col justify-between sm:flex-row">
              <p>
                <strong>Nights:</strong>
              </p>
              <p className="sm:ms-2">{nights}</p>
            </div>
            <div className="flex flex-col justify-between sm:flex-row">
              <p>
                <strong>Total price:</strong>
              </p>
              <p className="sm:ms-2">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-around">
        <div
          className="header-nav-links flex cursor-pointer gap-2 whitespace-nowrap"
          onClick={onEdit}
        >
          <FaEdit
            className="text-lg"
            style={{
              color: "var(--link-color)",
            }}
          />{" "}
          Edit
        </div>
        <div
          className="header-nav-links flex cursor-pointer gap-2 whitespace-nowrap"
          onClick={onDelete}
        >
          <FaTrashAlt
            className="text-lg"
            style={{
              color: "var(--link-color)",
            }}
          />{" "}
          Delete
        </div>
      </div>
    </div>
  );
};

BookingInfo.propTypes = {
  booking: PropTypes.object.isRequired,
  nights: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookingInfo;
