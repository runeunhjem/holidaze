import PropTypes from "prop-types";
import { Popover, CardContent, Typography } from "@mui/material";

function VenuePopover({ selectedVenue, anchorEl, open, onClose }) {
  if (!selectedVenue) {
    return null; // Don't render if no venue is selected
  }

  const id = open ? "venue-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
          backgroundColor: "var(--menu-bg-color)",
          color: "var(--menu-hover-bg-color)",
          border: "1px solid var(--profile-text-color)",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          {selectedVenue.name}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          {selectedVenue.description}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
            marginTop: "10px",
          }}
        >
          Price: ${selectedVenue.price}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Max guests: {selectedVenue.maxGuests}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Rating: {selectedVenue.rating}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
            margin: "10px 0",
          }}
        >
          Images: {selectedVenue.media.length}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Wifi: {selectedVenue.meta.wifi ? "Yes" : "No"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Breakfast: {selectedVenue.meta.breakfast ? "Yes" : "No"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Parking: {selectedVenue.meta.parking ? "Yes" : "No"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Pets allowed: {selectedVenue.meta.pets ? "Yes" : "No"}
        </Typography>
      </CardContent>
    </Popover>
  );
}

VenuePopover.propTypes = {
  selectedVenue: PropTypes.object,
  anchorEl: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default VenuePopover;
