import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import getCountryCode from "../../utils/getCountryCode";

export const validateVenue = (venue, options) => {
  const hasAtLeastOneImage = venue.media && venue.media.length >= 0;
  const hasValidTitle = venue.name && !venue.name.includes("aaa");
  const countryCode = getCountryCode(venue.location.country);
  const isValid = (
    hasAtLeastOneImage &&
    hasValidTitle &&
    countryCode &&
    countryCode !== "Unknown"
  );

  // Check if the option to hide venues without images is enabled
  if (options.hideWithoutImages) {
    return isValid;
  } else {
    return true; // Always return true if the option is disabled
  }
};

const Options = ({ open, onClose, options, onOptionsChange }) => {
  const handleOptionChange = (field, value) => {
    onOptionsChange({ ...options, [field]: value });
  };

  const items = [
    { field: "hasFreeParking", label: "Has free parking" },
    { field: "hasFreeWifi", label: "Has free Wifi" },
    { field: "hasBreakfast", label: "Breakfast is included" },
    { field: "allowsPets", label: "Pets are allowed" },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: open ? "translate(-50%, -100%)" : "translate(-50%, 100%)",
        width: "100% !important",
        borderRadius: "20px 20px 20px 20px",
        bgcolor: "var(--header-bg-color)",
        boxShadow: 24,
        border: "1px solid var(--border-color)",
        p: { xs: 2, sm: 4 },
        zIndex: 1300,
        overflowY: "auto",
        transition: "transform 0.3s ease-in-out",
        // Adding marginX and responsive maxWidth
        mx: { xs: "auto", sm: "auto" },
        minWidth: { xs: "320px", sm: "600px" },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Options
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.hideWithoutImages}
                onChange={(e) =>
                  handleOptionChange("hideWithoutImages", e.target.checked)
                }
              />
            }
            label="Hide venues without images"
          />
        </Grid>

        {[10, 20, 50, 100].map((count) => (
          <Grid item xs={12} sm={6} key={count}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.venuesPerPage === count}
                  onChange={() => handleOptionChange("venuesPerPage", count)}
                />
              }
              label={`${count} venues per page`}
            />
          </Grid>
        ))}

        {items.length > 0
          ? items.map(({ field, label }) => (
              <Grid item xs={12} key={field}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options[field]}
                      onChange={(e) =>
                        handleOptionChange(field, e.target.checked)
                      }
                    />
                  }
                  label={label}
                />
              </Grid>
            ))
          : null}
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "var(--button-bg-color-cancel)",
            color: "var(--button-text-color-cancel)",
            "&:hover": {
              backgroundColor: "var(--button-bg-color-hover-cancel)",
              color: "var(--button-text-color-cancel)",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

Options.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  onOptionsChange: PropTypes.func.isRequired,
};

export default Options;
