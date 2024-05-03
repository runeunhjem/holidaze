import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import useStore from "../../hooks/useStore";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS } from "../../constants/api";

const ProfileEditModal = ({ open, handleClose }) => {
  const { setUserDetails, viewedProfile, accessToken } = useStore();
  const [formData, setFormData] = useState({
    bio: viewedProfile.bio || "",
    avatarUrl: viewedProfile.avatar?.url || "",
    avatarAlt: viewedProfile.avatar?.alt || "",
    bannerUrl: viewedProfile.banner?.url || "",
    bannerAlt: viewedProfile.banner?.alt || "",
    venueManager: Boolean(viewedProfile.venueManager),
  });

  useEffect(() => {
    setFormData({
      bio: viewedProfile.bio || "",
      avatarUrl: viewedProfile.avatar?.url || "",
      avatarAlt: viewedProfile.avatar?.alt || "",
      bannerUrl: viewedProfile.banner?.url || "",
      bannerAlt: viewedProfile.banner?.alt || "",
      venueManager: Boolean(viewedProfile.venueManager),
    });
  }, [viewedProfile]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const { bio, avatarUrl, avatarAlt, bannerUrl, bannerAlt, venueManager } =
      formData;
    const updatedProfile = {
      bio,
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
      banner: {
        url: bannerUrl,
        alt: bannerAlt,
      },
      venueManager,
    };

    try {
      const response = await fetchApi(
        `${ENDPOINTS.profiles}/${viewedProfile.name}`,
        {
          method: "PUT",
          headers: {
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        },
      );
      setUserDetails(response.data);
      handleClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          outline: "1px solid var(--profile-text-color)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "var(--body-bg-color)",
          color: "var(--profile-text-color)",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" mb={2} className="flex">
          <img
            src={formData.avatarUrl}
            alt={formData.avatarAlt}
            className="me-5 w-10 rounded-full"
          />
          Edit Profile
        </Typography>

        <TextField
          label="Avatar URL"
          name="avatarUrl"
          fullWidth
          value={formData.avatarUrl}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Avatar Alt Text"
          name="avatarAlt"
          fullWidth
          value={formData.avatarAlt}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Banner URL"
          name="bannerUrl"
          fullWidth
          value={formData.bannerUrl}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Banner Alt Text"
          name="bannerAlt"
          fullWidth
          value={formData.bannerAlt}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          id="bio-textfield" // Add a unique ID
          label="Profile Bio" // More descriptive label
          name="bio"
          aria-label="Profile Bio" // Optional: Direct label for screen readers
          multiline
          rows={3}
          fullWidth
          value={formData.bio}
          onChange={handleInputChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.venueManager}
              name="venueManager"
              onChange={handleInputChange}
            />
          }
          label="Venue Manager"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "var(--button-bg-color)",
            color: "var(--button-text-color)",
            "&:hover": {
              outline: "1px solid var(--border-color)",
              backgroundColor: "var(--button-bg-color-hover)",
              color: "var(--button-text-color-hover)",
            },
            mt: 2,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

ProfileEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ProfileEditModal;
