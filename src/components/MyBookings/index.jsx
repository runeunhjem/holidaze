import PropTypes from "prop-types";
import { useState, useMemo, useEffect } from "react";
import useStore from "../../hooks/useStore";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VenuePopover from "../VenuePopover";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { sanitizeVenue } from "../../utils/sanitizeVenue";
import "./index.css";

function MyBookings({ viewedProfile }) {
  const { favorites, addFavoriteVenue, removeFavoriteVenue, options, userDetails } =
    useStore();
  const [bookings, setBookings] = useState(viewedProfile?.bookings || []);

  useEffect(() => {
    setBookings(viewedProfile?.bookings || []);
  }, [viewedProfile]);

  // console.log("Bookings:", bookings);

  const transformedBookings = useMemo(() => {
    return bookings.map((booking) => ({
      ...booking,
      venue: sanitizeVenue(booking.venue || {}, options),
    }));
  }, [bookings, options]);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleHover = (event, booking) => {
    if (!anchorEl) {
      setAnchorEl(null);
    }
    setAnchorEl(event.currentTarget);
    setSelectedVenue(booking.venue);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVenue(null);
  };

  const open = Boolean(anchorEl);

  const formatShortDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  const isFavorite = (venueId) =>
    favorites.some((venue) => venue.id === venueId);

  const toggleFavorite = (venue) => {
    if (isFavorite(venue.id)) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
  };

  const isOwnProfile = userDetails.name === viewedProfile.name;
  const headerText = isOwnProfile ? "My Venues" : "Their Venues";

  return (
    <Box
      className="my-bookings-container"
      style={{
        padding: "16px 8px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div className="mt-6 flex justify-around px-6">
        <Typography variant="h4" align="center" gutterBottom>
          {headerText}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          (
          {
            transformedBookings.filter(
              (booking) => new Date(booking.dateTo) >= new Date(),
            ).length
          }
          )
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
          className="bookings-container flex justify-center py-6"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            position: "relative",
          }}
        >
          {transformedBookings
            .filter((booking) => new Date(booking.dateTo) >= new Date())
            .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
            .map((booking) => (
              <div
                key={booking.id}
                className="booking-card-container flex justify-center"
                style={{
                  borderRadius: "20px 0 0 20px",
                  height: "176px",
                }}
                onMouseLeave={handleClose}
              >
                <div
                  className="favorite-overlay"
                  onClick={() => toggleFavorite(booking.venue)}
                >
                  {isFavorite(booking.venue.id) ? (
                    <TbHeartFilled className="text-lg text-red-500" />
                  ) : (
                    <TbHeart className="text-lg text-red-500" />
                  )}
                </div>
                <Card
                  className="booking-container"
                  style={{
                    borderRadius: "5px 0 0 5px",
                    width: "40%",
                  }}
                >
                  <CardMedia
                    onMouseLeave={handleClose}
                    onMouseEnter={(e) => handleHover(e, booking)}
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

                  <div className="id-overlay flex items-center justify-around py-1 text-xs">
                    Your Ref: {booking.id.slice(0, 6)}
                  </div>
                </Card>
                <div className="city-overlay flex items-center justify-between whitespace-nowrap px-3">
                  <div className="truncate-bookings-on-small pe-2">
                    {booking.venue.name || "Unspecified title"},{" "}
                    {booking.venue.location.city || "Unspecified city"},{" "}
                    {booking.venue.location.country || "Unspecified country"}
                  </div>
                  <span
                    onMouseEnter={(e) => handleHover(e, booking)}
                    className="flex cursor-pointer items-center justify-around whitespace-nowrap py-1 text-xs"
                    onMouseLeave={handleClose}
                  >
                    {" "}
                    [ Venue details ]
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
                    <Link to={`/bookings/${booking.id}`}>View Booking</Link>
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
      <VenuePopover
        selectedVenue={selectedVenue}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}

MyBookings.propTypes = {
  viewedProfile: PropTypes.object.isRequired,
};

export default MyBookings;
