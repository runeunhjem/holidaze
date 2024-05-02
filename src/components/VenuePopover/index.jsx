import PropTypes from "prop-types";
import { Popover, CardContent, Typography } from "@mui/material";

function VenuePopover({ selectedVenue, anchorEl, open, onClose }) {
  if (!selectedVenue) {
    return null; // Don't render if no venue is selected
  }

  const id = open ? "venue-popover" : undefined;

  // Split the description into individual sentences
  const descriptionParagraphs = selectedVenue.description.split(". ").map(
    (sentence, index) => `${sentence.trim()}.`, // Add back the period to each sentence
  );

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
        minWidth: "300px",
        // width: "90%",
        zIndex: 1000, // Ensure popover is above other elements
        maxWidth: "600px",
      }}
    >
      <CardContent
        style={{
          backgroundColor: "var(--menu-bg-color)",
          color: "var(--menu-hover-bg-color)",
          border: "1px solid var(--profile-text-color)",
          borderRadius: "5px",
          padding: "20px",
          overflowY: "auto", // Allow scrolling for longer content
          // maxHeight: "300px", // Or any desired height
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
          variant="h5"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          {selectedVenue.location.country}, {selectedVenue.location.continent}
        </Typography>
        {/* Render each sentence of the description as its own paragraph */}
        {descriptionParagraphs.map((paragraph, index) => (
          <Typography
            key={index}
            variant="body2"
            style={{
              color: "var(--profile-text-color)",
            }}
          >
            {paragraph}
          </Typography>
        ))}

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
