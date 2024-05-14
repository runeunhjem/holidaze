import PropTypes from "prop-types";
import { Popover, CardContent, Typography } from "@mui/material";

function VenuePopover({ selectedVenue, anchorEl, open = false, onClose }) {
  if (!selectedVenue) {
    return null; // Don't render if no venue is selected
  }

  const id = open ? "venue-popover" : false;

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
      sx={{
        pointerEvents: "none",
        marginTop: "10px",
        maxWidth: "100%",
        whiteSpace: "wrap",
        borderRadius: "5px",
      }}
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
            // minWidth: "250px",
          }}
        >
          {/* {selectedVenue.name || "Unknown Venue"} */}
          {selectedVenue.name
            ? selectedVenue.name.split(" ").slice(0, 3).join(" ") +
              (selectedVenue.name.split(" ").length > 3 ? "..." : "")
            : "Title has not been specified"}
        </Typography>
        <Typography
          variant="h5"
          style={{
            // whiteSpace: "nowrap",
            color: "var(--profile-text-color)",
          }}
        >
          {selectedVenue.location &&
          selectedVenue.location.country &&
          selectedVenue.location.continent
            ? `${selectedVenue.location.country}, ${selectedVenue.location.continent}`
            : "Location Unknown"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          {selectedVenue.description
            ? selectedVenue.description.split(" ").slice(0, 6).join(" ") +
              (selectedVenue.description.split(" ").length > 6 ? "..." : "")
            : "Description not available"}
        </Typography>

        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
            marginTop: "10px",
          }}
        >
          Price: ${selectedVenue.price || "N/A"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Max guests: {selectedVenue.maxGuests || "N/A"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Rating: {selectedVenue.rating || "N/A"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
            margin: "10px 0",
          }}
        >
          Images: {selectedVenue.media ? selectedVenue.media.length : "N/A"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Wifi: {selectedVenue.meta && selectedVenue.meta.wifi ? "Yes" : "No"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Breakfast:{" "}
          {selectedVenue.meta && selectedVenue.meta.breakfast ? "Yes" : "No"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Parking:{" "}
          {selectedVenue.meta && selectedVenue.meta.parking ? "Yes" : "No"}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Pets allowed:{" "}
          {selectedVenue.meta && selectedVenue.meta.pets ? "Yes" : "No"}
        </Typography>
      </CardContent>
    </Popover>
  );
}

VenuePopover.propTypes = {
  selectedVenue: PropTypes.object,
  anchorEl: PropTypes.object,
  open: PropTypes.bool, // Open prop is now marked as optional
  onClose: PropTypes.func,
};

export default VenuePopover;
