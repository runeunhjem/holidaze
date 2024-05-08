import { useState, useMemo } from "react";
import useStore from "../../hooks/useStore";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VenuePopover from "../VenuePopover";
import "./index.css";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

function MyFavoriteVenues() {
  const { favorites, addFavoriteVenue, removeFavoriteVenue } = useStore(); // Get favorite venues and actions from the global store
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

  // Memoize favorites to avoid unnecessary re-renders
  const favoriteDisplay = useMemo(() => favorites, [favorites]);

  const isFavorite = (venueId) =>
    favorites.some((venue) => venue.id === venueId);

  const toggleFavorite = (venue) => {
    if (isFavorite(venue.id)) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
  };

  return (
    <Box
      className="my-favorite-venues-container"
      style={{
        padding: "16px 8px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div className="mt-6 flex items-center justify-around px-6">
        <Typography variant="h4" align="center" gutterBottom>
          My Favorite Venues
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          ({favorites.length})
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

      {favorites.length > 0 ? (
        <div
          className="venues-container flex items-center justify-center py-6"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {favoriteDisplay.map((venue) => (
            <div
              key={venue.id}
              className="venue-card-container flex items-center justify-center"
              style={{ flexBasis: "25%", borderRadius: "20px" }}
            >
              <Card
                className="venue-container"
                style={{ borderRadius: "20px", position: "relative" }}
                onMouseLeave={handleClose}
              >
                <CardMedia
                  onClick={() => navigate(`/venues/${venue.id}`)}
                  onMouseEnter={(e) => handleHover(e, venue)}
                  component="img"
                  className="venue-image"
                  image={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                />

                <div className="city-overlay flex items-center justify-around">
                  {venue.location.city}
                  <span
                    onClick={(e) => handleHover(e, venue)}
                    onMouseEnter={(e) => handleHover(e, venue)}
                    onMouseLeave={handleClose}
                    className="cursor-pointer py-1 text-sm"
                  >
                    {" "}
                    [Info]
                  </span>
                </div>
                <div className="id-overlay flex items-center justify-around py-1 text-xs">
                  Venue ID: {venue.id.slice(0, 6)}
                </div>
                <div
                  className="favorite-overlay"
                  onClick={() => toggleFavorite(venue)}
                >
                  {isFavorite(venue.id) ? (
                    <TbHeartFilled className="text-lg text-red-500" />
                  ) : (
                    <TbHeart className="text-lg text-red-500" />
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1" align="center">
          No favorite venues available.
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

export default MyFavoriteVenues;
