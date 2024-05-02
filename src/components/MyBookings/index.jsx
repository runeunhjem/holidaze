import { useState, useMemo } from "react";
import useStore from "../../hooks/useStore";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VenuePopover from "../VenuePopover";
import "./index.css";

function MyBookings() {
  const { viewedProfile } = useStore(); // Retrieve necessary items from global store

  const bookingsList = useMemo(
    () => viewedProfile?.bookings || [],
    [viewedProfile],
  );

  const transformedBookings = useMemo(() => {
    return bookingsList.map((booking) => ({
      ...booking,
      venue: booking.venue || {},
    }));
  }, [bookingsList]);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleHover = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedVenue(booking.venue); // Ensure `venue` exists before setting
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVenue(null);
  };

  const open = Boolean(anchorEl);

  const formatShortDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // "en-GB" provides "dd/mm/yyyy" format
  };

  return (
    <Box
      className="my-bookings-container"
      style={{
        padding: "16px 8px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div className="items center mt-6 flex justify-around px-6">
        <Typography variant="h4" align="center" gutterBottom>
          My Bookings
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          ({transformedBookings.length})
        </Typography>
      </div>
      <hr
        className="w-90 sm:w-3/4 md:w-2/3"
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "2px solid var(--profile-text-color)",
          backgroundColor: "transparent",
          height: "0px",
          margin: "1px auto 20px auto",
        }}
      />

      {transformedBookings.length > 0 ? (
        <div
          className="bookings-container items center flex justify-center py-6"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {transformedBookings.map((booking) => (
            <div
              key={booking.id}
              className="booking-card-container items center flex justify-center"
              style={{ borderRadius: "20px 0 0 20px", height: "176px" }}
              onMouseLeave={handleClose}
            >
              <Card
                className="booking-container"
                style={{
                  borderRadius: "5px 0 0 5px",
                  width: "40%",
                  // height: "99%"
                }}
              >
                <CardMedia
                  onMouseLeave={handleClose}
                  onMouseEnter={(e) => handleHover(e, booking)}
                  // onClick={() => navigate(`/bookings/${booking.id}`)}
                  onClick={() => navigate(`/venues/${booking.venue.id}`)}
                  component="img"
                  className="booking-image"
                  style={{
                    borderRadius: "5px 0 0 5px",
                    height: "100%",
                  }}
                  image={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || booking.venue.name}
                />

                <div className="id-overlay items center flex justify-around">
                  ID: {booking.id.slice(0, 6)}
                </div>
              </Card>
              <div className="city-overlay items center flex justify-around">
                {booking.venue.name}, {booking.venue.location.city}
                <span
                  onMouseEnter={(e) => handleHover(e, booking)}
                  className="cursor-pointer text-sm"
                  onMouseLeave={handleClose}
                >
                  {" "}
                  [Info]
                </span>
              </div>
              <div
                className="my-booking-details items center flex flex-col justify-start"
                style={{
                  backgroundColor: "var(--menu-bg-color)",
                  width: "60%",
                  fontSize: "calc(14px + 0.2vmin)",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "calc(14px + 0.2vmin)",
                    textAlign: "left",
                    paddingLeft: "10px",
                    paddingTop: "28px",
                    marginBottom: "0px",
                  }}
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  Booked for {booking.guests} guests
                </Typography>
                <Typography
                  style={{
                    fontSize: "calc(14px + 0.2vmin)",
                    textAlign: "left",
                    paddingLeft: "10px",
                    marginBottom: "0px",
                  }}
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  Check-in: {formatShortDate(booking.dateFrom)}
                </Typography>
                {/* <Typography
                  style={{
                    fontSize: "calc(14px + 0.2vmin)",
                    textAlign: "left",
                    paddingLeft: "20px",
                  }}
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  {formatShortDate(booking.dateFrom)}
                </Typography> */}
                <Typography
                  style={{
                    fontSize: "calc(14px + 0.2vmin)",
                    textAlign: "left",
                    paddingLeft: "10px",
                    marginBottom: "0px",
                  }}
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  Check-out: {formatShortDate(booking.dateTo)}
                </Typography>
                <Typography
                  style={{
                    fontSize: "calc(14px + 0.2vmin)",
                    textAlign: "left",
                    paddingLeft: "10px",
                    marginTop: "2.5rem",
                  }}
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  <Link to={`/bookings/${booking.id}`}>Booking details</Link>
                </Typography>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1" align="center">
          No bookings available.
        </Typography>
      )}

      {/* VenuePopover */}
      <VenuePopover
        selectedVenue={selectedVenue}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}

export default MyBookings;
