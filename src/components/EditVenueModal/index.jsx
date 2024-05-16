import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
} from "@mui/material";
import { editVenue } from "../../utils/editVenue";
import useStore from "../../hooks/useStore";

const EditVenueModal = ({ open, onClose, onVenueUpdated, currentVenue }) => {
  const { accessToken, setViewedProfile } = useStore();
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    rating: "",
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    if (currentVenue) {
      setVenueData(currentVenue);
    }
  }, [currentVenue]);

  const handleChange = (field, value) => {
    setVenueData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMetaChange = (field, value) => {
    setVenueData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [field]: value },
    }));
  };

  const handleLocationChange = (field, value) => {
    setVenueData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...venueData.media];
    updatedMedia[index][field] = value;
    setVenueData((prev) => ({ ...prev, media: updatedMedia }));
  };

  const handleAddMedia = () => {
    setVenueData((prev) => ({
      ...prev,
      media: [...prev.media, { url: "", alt: "" }],
    }));
  };

  const handleNumericInput = (field, value, validator) => {
    if (value === "" || value === "-") {
      setVenueData((prev) => ({ ...prev, [field]: value }));
      return;
    }

    const regex = /^-?\d*\.?\d*$/;
    if (!regex.test(value)) {
      return;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && validator(numericValue)) {
      setVenueData((prev) => ({ ...prev, [field]: numericValue }));
    } else {
      setVenueData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isValidLatitude = (value) => value >= -90 && value <= 90;
  const isValidLongitude = (value) => value >= -180 && value <= 180;
  const isValidRating = (value) => value >= 0 && value <= 5;

  const handleZipChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      handleLocationChange("zip", value);
    }
  };

  const handleSubmit = async () => {
    const originalOwner = currentVenue.owner; // Save the original owner
    try {
      const updatedVenue = await editVenue(
        currentVenue.id,
        venueData,
        accessToken,
      );
      // Restore the owner if it gets lost
      if (!updatedVenue.owner) {
        updatedVenue.owner = originalOwner;
      }
      onVenueUpdated(updatedVenue);
      setViewedProfile((prevProfile) => {
        const updatedVenues = prevProfile.venues.map((venue) =>
          venue.id === updatedVenue.id ? updatedVenue : venue,
        );
        return { ...prevProfile, venues: updatedVenues };
      });
      setTimeout(onClose, 500); // Adding a delay to the close action
    } catch (error) {
      console.error("Failed to update venue:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="custom-scrollbar"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: 600 },
          maxHeight: "80vh",
          bgcolor: "var(--header-bg-color)",
          boxShadow: 0,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Venue
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "var(--cards-sections-bg-color)",
                color: "var(--profile-text-color)",
                borderRadius: "4px",
              }}
            >
              <Typography variant="subtitle1">Basic Info</Typography>

              <TextField
                label="Name"
                value={venueData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Description"
                value={venueData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                fullWidth
                margin="normal"
                multiline
                required
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "var(--cards-sections-bg-color)",
                color: "var(--profile-text-color)",
                borderRadius: "4px",
              }}
            >
              <Typography variant="subtitle1">Media</Typography>
              {venueData.media.map((media, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ maxWidth: "250px" }}>
                      <TextField
                        label="Media URL"
                        value={media.url}
                        onChange={(e) =>
                          handleMediaChange(index, "url", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ maxWidth: "250px" }}>
                      <TextField
                        label="Image Description"
                        value={media.alt}
                        onChange={(e) =>
                          handleMediaChange(index, "alt", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
              <Button
                sx={{
                  bgcolor: "var(--button-bg-color)",
                  color: "var(--button-text-color)",
                  "&:hover": {
                    outline: "1px solid var(--border-color)",
                    backgroundColor: "var(--button-bg-color-hover)",
                    color: "var(--button-text-color-hover)",
                  },
                }}
                onClick={handleAddMedia}
              >
                Add one more image
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "var(--cards-sections-bg-color)",
                color: "var(--profile-text-color)",
                borderRadius: "4px",
              }}
            >
              <Typography variant="subtitle1">Pricing & Guests</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{ maxWidth: "250px" }}>
                  <TextField
                    label="Price"
                    type="text"
                    value={venueData.price}
                    placeholder="Price"
                    onChange={(e) =>
                      handleNumericInput(
                        "price",
                        e.target.value,
                        (value) => value >= 0,
                      )
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ maxWidth: "250px" }}>
                  <TextField
                    label="Max Guests"
                    type="text"
                    value={venueData.maxGuests}
                    placeholder="Max Guests"
                    onChange={(e) =>
                      handleNumericInput(
                        "maxGuests",
                        e.target.value,
                        (value) => value >= 0,
                      )
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ maxWidth: "250px" }}>
                  <TextField
                    label="Rating"
                    type="text"
                    value={venueData.rating}
                    placeholder="Rating"
                    onChange={(e) =>
                      handleNumericInput(
                        "rating",
                        e.target.value,
                        isValidRating,
                      )
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "var(--cards-sections-bg-color)",
                color: "var(--profile-text-color)",
                borderRadius: "4px",
              }}
            >
              <Typography variant="subtitle1">Location</Typography>

              <TextField
                label="Address"
                value={venueData.location.address}
                onChange={(e) =>
                  handleLocationChange("address", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="City"
                value={venueData.location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="ZIP"
                value={venueData.location.zip}
                onChange={handleZipChange}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Country"
                value={venueData.location.country}
                onChange={(e) =>
                  handleLocationChange("country", e.target.value)
                }
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Continent"
                value={venueData.location.continent}
                onChange={(e) =>
                  handleLocationChange("continent", e.target.value)
                }
                fullWidth
                margin="normal"
                required
              />

              <TextField
                disabled
                label="Latitude"
                type="text"
                value={venueData.location.lat}
                onChange={(e) =>
                  handleNumericInput("lat", e.target.value, isValidLatitude)
                }
                fullWidth
                margin="normal"
              />

              <TextField
                disabled
                label="Longitude"
                type="text"
                value={venueData.location.lng}
                onChange={(e) =>
                  handleNumericInput("lng", e.target.value, isValidLongitude)
                }
                fullWidth
                margin="normal"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "var(--cards-sections-bg-color)",
                color: "var(--profile-text-color)",
                borderRadius: "4px",
              }}
            >
              <Typography variant="subtitle1">Amenities</Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={venueData.meta.wifi}
                    onChange={(e) => handleMetaChange("wifi", e.target.checked)}
                  />
                }
                label="WiFi"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={venueData.meta.parking}
                    onChange={(e) =>
                      handleMetaChange("parking", e.target.checked)
                    }
                  />
                }
                label="Parking"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={venueData.meta.breakfast}
                    onChange={(e) =>
                      handleMetaChange("breakfast", e.target.checked)
                    }
                  />
                }
                label="Breakfast"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={venueData.meta.pets}
                    onChange={(e) => handleMetaChange("pets", e.target.checked)}
                  />
                }
                label="Pets"
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleSubmit}
            sx={{
              bgcolor: "var(--button-bg-color)",
              color: "var(--button-text-color)",
              width: "45%",
              "&:hover": {
                outline: "1px solid var(--border-color)",
                backgroundColor: "var(--button-bg-color-hover)",
                color: "var(--button-text-color-hover)",
              },
              mt: 2,
            }}
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            sx={{
              bgcolor: "var(--button-bg-color-cancel)",
              color: "var(--button-text-color-cancel)",
              width: "45%",
              "&:hover": {
                backgroundColor: "var(--button-bg-color-hover-cancel)",
                color: "var(--button-text-color-cancel)",
              },
              mt: 2,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

EditVenueModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVenueUpdated: PropTypes.func.isRequired,
  currentVenue: PropTypes.object.isRequired,
};

export default EditVenueModal;
