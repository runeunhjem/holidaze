import { useState, useMemo, useEffect } from "react";
import useStore from "../../hooks/useStore";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
              style={{ flexBasis: "25%", borderRadius: "20px" }}
            >
              <Card
                className="booking-container"
                style={{ borderRadius: "20px" }}
                onClick={() => navigate(`/bookings/${booking.id}`)}
                onMouseEnter={(e) => handleHover(e, booking)}
                onMouseLeave={handleClose}
              >
                <CardMedia
                  component="img"
                  className="venue-image"
                  image={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || booking.venue.name}
                />

                <div className="id-overlay items center flex justify-around">
                  ID: {booking.id.slice(0, 6)}
                </div>

                <div className="city-overlay items center flex justify-around">
                  {booking.venue.location.city}
                  <span className="text-sm"> [Info]</span>
                </div>

                <div className="venue-bookings items center flex flex-col justify-center">
                  <Typography variant="h6" align="center" gutterBottom>
                    {booking.venue.name}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    Booked from {booking.dateFrom} to {booking.dateTo}
                  </Typography>
                </div>
              </Card>
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
