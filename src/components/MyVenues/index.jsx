import { useState, useMemo, useEffect } from "react";
import useStore from "../../hooks/useStore";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VenuePopover from "../VenuePopover";
import "./index.css";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import CreateVenueModal from "../CreateVenueModal";

function MyVenues() {
  const {
    viewedProfile,
    setViewedProfile,
    userDetails,
    favorites,
    addFavoriteVenue,
    removeFavoriteVenue,
  } = useStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venues, setVenues] = useState(viewedProfile?.venues || []);

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

  const open = Boolean(anchorEl);

  // Memoize venues to avoid unnecessary re-renders
  const venueDisplay = useMemo(() => venues, [venues]);

  const isFavorite = (venueId) =>
    favorites.some((venue) => venue.id === venueId);

  const toggleFavorite = (venue) => {
    if (isFavorite(venue.id)) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
  };

  // Determine header text based on user ID comparison
  const isOwnProfile = userDetails.name === viewedProfile.name;
  const headerText = isOwnProfile ? "My Venues" : "Their Venues";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleVenueCreated = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
    setViewedProfile((prevProfile) => ({
      ...prevProfile,
      venues: [...(prevProfile.venues || []), newVenue],
    }));
    setIsModalOpen(false);
  };

  return (
    <Box
      className="my-venues-container"
      style={{
        padding: "16px 8px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div className="mt-6 flex items-center justify-around px-6">
        <Typography variant="h4" align="center" gutterBottom>
          {headerText}
          <Button
            startIcon={<MdOutlineAddCircleOutline />}
            onClick={handleOpenModal}
          ></Button>
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
          className="venues-container items center flex justify-center py-6"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {venueDisplay.map((venue) => (
            <div
              key={venue.id}
              className="venue-card-container items center flex justify-center"
              style={{ flexBasis: "25%", borderRadius: "20px" }}
            >
              <Card
                className="venue-container"
                style={{
                  borderRadius: "20px",
                  position: "relative",
                }}
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

                <div className="city-overlay items center flex justify-around">
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
                <div className="id-overlay items center flex justify-around py-1 text-xs">
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
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}

export default MyVenues;
