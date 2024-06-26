import PropTypes from "prop-types";
import React, { useState } from "react";
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
import { MdClose } from "react-icons/md";
import { createNewVenue } from "../../utils/createNewVenue";
import useStore from "../../hooks/useStore";
import AddMissingFormLabelsToMUI from "../../utils/addMissingFormLabelsToMUI";
import { useNavigate } from "react-router-dom";

const CreateVenueModal = ({ open, onClose, onVenueCreated, loadProfile }) => {
  const { accessToken, userDetails } = useStore();
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setVenueData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
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
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...venueData.media];
    updatedMedia[index][field] = value;
    setVenueData((prev) => ({ ...prev, media: updatedMedia }));
    if (errors.mediaUrl && field === "url") {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.mediaUrl;
        return newErrors;
      });
    }
  };

  const handleAddMedia = () => {
    setVenueData((prev) => ({
      ...prev,
      media: [...prev.media, { url: "", alt: "" }],
    }));
  };

  const handleNumericInput = (field, value, validator) => {
    if (value === "") {
      setVenueData((prev) => ({ ...prev, [field]: value }));
      return;
    }

    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(value)) {
      return;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && validator(numericValue)) {
      setVenueData((prev) => ({ ...prev, [field]: numericValue }));
      if (errors[field]) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const isValidLatitude = (value) => value >= -90 && value <= 90;
  const isValidLongitude = (value) => value >= -180 && value <= 180;
  const isValidPrice = (value) => value >= 1;
  const isValidMaxGuests = (value) => value >= 1;
  const isValidRating = (value) => value >= 1 && value <= 5;

  const handleZipChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      handleLocationChange("zip", value);
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!venueData.name) newErrors.name = "Name is required";
    if (!venueData.description)
      newErrors.description = "Description is required";
    if (!venueData.media[0].url) newErrors.mediaUrl = "Media URL is required";
    if (!venueData.price) newErrors.price = "Price is required";
    if (!venueData.maxGuests) newErrors.maxGuests = "Max Guests is required";
    if (!venueData.location.city) newErrors.city = "City is required";
    if (!venueData.location.country) newErrors.country = "Country is required";
    if (!venueData.location.continent)
      newErrors.continent = "Continent is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const newVenue = await createNewVenue(venueData, accessToken);
      onVenueCreated(newVenue);
      if (loadProfile) {
        await loadProfile(userDetails.name);
      }
      onClose();
      navigate(`/profile/${userDetails.name}`);
    } catch (error) {
      console.error("Failed to create venue:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <AddMissingFormLabelsToMUI />
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
          <MdClose
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "gray",
              fontSize: "24px",
            }}
          />
          <Typography variant="h6" gutterBottom>
            Create New Venue
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
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
                <TextField
                  label="Description"
                  value={venueData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  error={!!errors.description}
                  helperText={errors.description}
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
                          error={!!errors.mediaUrl}
                          helperText={errors.mediaUrl}
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
                  Add one more image{" "}
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
                          isValidPrice,
                        )
                      }
                      fullWidth
                      margin="normal"
                      error={!!errors.price}
                      helperText={errors.price}
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
                          isValidMaxGuests,
                        )
                      }
                      fullWidth
                      margin="normal"
                      error={!!errors.maxGuests}
                      helperText={errors.maxGuests}
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
                  error={!!errors.city}
                  helperText={errors.city}
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
                  error={!!errors.country}
                  helperText={errors.country}
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
                  error={!!errors.continent}
                  helperText={errors.continent}
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
                      onChange={(e) =>
                        handleMetaChange("wifi", e.target.checked)
                      }
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
                      onChange={(e) =>
                        handleMetaChange("pets", e.target.checked)
                      }
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
                bgcolor:
                  Object.keys(errors).length > 0
                    ? "var(--button-bg-color-hover-cancel)"
                    : "var(--button-bg-color)",
                color:
                  Object.keys(errors).length > 0
                    ? "var(--button-text-color-cancel)"
                    : "var(--button-text-color)",
                width: "45%",
                "&:hover": {
                  outline: "1px solid var(--border-color)",
                  backgroundColor:
                    Object.keys(errors).length > 0
                      ? "var(--button-bg-color-hover-cancel)"
                      : "var(--button-bg-color-hover)",
                  color:
                    Object.keys(errors).length > 0
                      ? "var(--button-text-color-cancel)"
                      : "var(--button-text-color-hover)",
                },
                mt: 2,
              }}
            >
              {Object.keys(errors).length > 0 ? "Check errors" : "Create"}
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
      </div>
    </Modal>
  );
};

CreateVenueModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVenueCreated: PropTypes.func.isRequired,
  loadProfile: PropTypes.func,
};

export default CreateVenueModal;
