import { useState, useEffect } from "react";
import useStore from "../../hooks/useStore";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Popover,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

function MyVenues() {
  const { viewedProfile } = useStore(); // Get the user's profile from the global store
  const venues = viewedProfile?.venues || []; // Extract venues from the profile
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
  const id = open ? "venue-popover" : undefined;

  // Use an effect to close the popover on mouse leave or click outside
  useEffect(() => {
    const handleMouseLeave = (event) => {
      if (
        anchorEl &&
        !anchorEl.contains(event.target) &&
        !event.target.closest("#venue-popover")
      ) {
        handleClose();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [anchorEl]);

  return (
    <Box
      className="my-venues-container px-4 sm:px-0"
      style={{
        padding: "16px 8px",
        maxWidth: "1200px",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="mt-6 flex items-center justify-around px-6">
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
          className="venues-container flex items-center justify-center"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="venue-card-container flex items-center justify-center"
              style={{
                flexBasis: "30%",
                borderRadius: "20px",
                // margin: "0 auto",
                // justifyContent: "center",
              }}
            >
              <Card
                className="venue-container"
                style={{ borderRadius: "20px" }}
                onClick={() => navigate(`/venues/${venue.id}`)}
                onMouseEnter={(e) => handleHover(e, venue)}
                onMouseLeave={handleClose}
              >
                <CardMedia
                  component="img"
                  className="venue-image"
                  image={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                />

                {/* City overlay */}
                <div className="city-overlay flex items-center justify-around">
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

      {/* Popover to display venue information */}
      {selectedVenue && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{ pointerEvents: "none", marginTop: "10px" }}
        >
          <CardContent
            style={{
              backgroundColor: "var(--profile-text-color-inverted)",
              border: "1px solid var(--profile-text-color)",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Typography variant="h5">{selectedVenue.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {selectedVenue.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price: ${selectedVenue.price}
            </Typography>
          </CardContent>
        </Popover>
      )}
    </Box>
  );
}

export default MyVenues;
