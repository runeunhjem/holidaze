import { useState, useMemo } from "react";
import useStore from "../../hooks/useStore";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VenuePopover from "../VenuePopover";
import "./index.css";

function MyVenues() {
  const { viewedProfile  } = useStore(); // Retrieve necessary items from the global store
  const venues = useMemo(() => viewedProfile?.venues || [], [viewedProfile]); // Extract venues from the profile
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleHover = (event, venue) => {
    setAnchorEl(event.currentTarget);
    setSelectedVenue(venue);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVenue(null);
  };

  const open = Boolean(anchorEl);

  // Memoize venues to avoid unnecessary re-renders
  const venueDisplay = useMemo(() => venues, [venues]);

  return (
    <Box
      className="my-venues-container"
      style={{
        padding: "16px 8px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div className="mt-6 flex items center justify-around px-6">
        <Typography variant="h4" align="center" gutterBottom>
          My Venues
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          ({venues.length})
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

      {venues.length > 0 ? (
        <div
          className="venues-container flex items center justify-center"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {venueDisplay.map((venue) => (
            <div
              key={venue.id}
              className="venue-card-container items center flex justify-center"
              style={{ flexBasis: "30%", borderRadius: "20px" }}
            >
              <Card
                className="venue-container"
                style={{ borderRadius: "20px" }}
                onClick = {() => navigate(`/venues/${venue.id}`)}
                onMouseEnter={(e) => handleHover(e, venue)}
                onMouseLeave={handleClose}
              >
                <CardMedia
                  component="img"
                  className="venue-image"
                  image={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                />

                {/* <div className="venue-bookings flex flex-col items-center justify-center">
                  <Typography variant="h6" align="center" gutterBottom>
                    {venue.id}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    {bookings[venue.id] && bookings[venue.id].length > 0
                      ? `${bookings[venue.id].length} Bookings Found`
                      : "No Bookings"}
                  </Typography>
                </div> */}

                <div className="city-overlay items center flex justify-around">
                  {venue.location.city}
                  <span className="text-sm"> [Info]</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1" align="center">
          No venues available.
        </Typography>
      )}

      {/* VenuePopover */}
      <VenuePopover selectedVenue={selectedVenue} anchorEl={anchorEl} open={open} onClose={handleClose} />
    </Box>
  );
}

export default MyVenues;
