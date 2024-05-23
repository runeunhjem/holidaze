import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VenuePopover from "../VenuePopover";
import "./index.css";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import CreateVenueModal from "../CreateVenueModal";
import { sanitizeVenue } from "../../utils/sanitizeVenue";
import useStore from "../../hooks/useStore";

function MyVenues() {
  const {
    viewedProfile,
    setViewedProfile,
    userDetails,
    favorites,
    addFavoriteVenue,
    removeFavoriteVenue,
    options,
  } = useStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venues, setVenues] = useState(viewedProfile?.venues || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setVenues(viewedProfile?.venues || []);
  }, [viewedProfile]);

  const handleHover = (event, venue) => {
    setAnchorEl(event.currentTarget);
    setSelectedVenue(venue);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVenue(null);
  };

  const modalOpen = Boolean(anchorEl);

  const venueDisplay = useMemo(
    () => venues.map((venue) => sanitizeVenue(venue, options)),
    [venues, options],
  );

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleVenueCreated = useCallback(
    (newVenue) => {
      setViewedProfile((prevProfile) => ({
        ...prevProfile,
        venues: [...(prevProfile.venues || []), newVenue],
      }));
      setVenues((prevVenues) => [...prevVenues, newVenue]); // Update the local state
    },
    [setViewedProfile, setVenues],
  );

  return (
    <Box
      className="my-venues-container"
      style={{ padding: "16px 8px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div className="mt-6 flex items-center justify-around px-6">
        <Typography variant="h4" align="center" gutterBottom>
          {headerText}
          {isOwnProfile && (
            <Button
              startIcon={<MdOutlineAddCircleOutline />}
              onClick={handleOpenModal}
              style={{ color: "var(--link-color)" }}
            >
              <span className="visually-hidden">Add new venue</span>
            </Button>
          )}
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
          className="venues-container flex items-center justify-center py-6"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {venueDisplay.map((venue) => (
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
                  image={
                    venue.media && venue.media.length > 0
                      ? venue.media[0].url
                      : "default_image_url.jpg"
                  }
                  alt={
                    venue.media && venue.media.length > 0
                      ? venue.media[0].alt || venue.name
                      : "Default Alt Text"
                  }
                />

                <div className="city-overlay flex items-center justify-between px-3">
                  <span className="truncate-venues-on-small">
                    {venue.location.city || "Unspecified city"},{" "}
                    {venue.location.country || "Unspecified country"}
                  </span>
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
          No venues available.
        </Typography>
      )}

      <CreateVenueModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onVenueCreated={handleVenueCreated}
      />

      <VenuePopover
        selectedVenue={selectedVenue}
        anchorEl={anchorEl}
        open={modalOpen}
        onClose={handleClose}
      />
    </Box>
  );
}

export default MyVenues;
