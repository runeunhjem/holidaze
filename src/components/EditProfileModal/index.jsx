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
import { MdClose } from "react-icons/md";
import useStore from "../../hooks/useStore";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS } from "../../constants/api";
import AddMissingFormLabelsToMUI from "../../utils/addMissingFormLabelsToMUI";

const EditProfileModal = ({ open, handleClose }) => {
  const { setUserDetails, viewedProfile, accessToken, userDetails } =
    useStore();
  const [formData, setFormData] = useState({
    bio: viewedProfile.bio || "",
    avatarUrl: viewedProfile.avatar?.url || "",
    avatarAlt: viewedProfile.avatar?.alt || "",
    bannerUrl: viewedProfile.banner?.url || "",
    bannerAlt: viewedProfile.banner?.alt || "",
    venueManager: Boolean(viewedProfile.venueManager),
  });

  const isCurrentUser = userDetails.name === viewedProfile.name;

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
      venueManager,
    };

    if (avatarUrl.trim() !== "") {
      updatedProfile.avatar = {
        url: avatarUrl,
        alt: avatarAlt,
      };
    }

    if (bannerUrl.trim() !== "") {
      updatedProfile.banner = {
        url: bannerUrl,
        alt: bannerAlt,
      };
    }

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
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        borderRadius: 5,
      }}
    >
      <div>
        <AddMissingFormLabelsToMUI />
        <Box
          sx={{
            border: "1px solid var(--button-bg-color)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "300px",
            bgcolor: "var(--header-bg-color)",
            color: "var(--profile-text-color)",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: 5,
          }}
        >
          <MdClose
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "gray",
              fontSize: "24px",
            }}
          />
          <Typography
            variant="h6"
            component="h2"
            mb={2}
            className="flex items-center"
          >
            <img
              src={formData.avatarUrl}
              alt={formData.avatarAlt}
              className="me-5 w-10 rounded-full"
              style={{
                boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.6)",
              }}
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
            disabled={!isCurrentUser}
          />
          <TextField
            label="Avatar Alt Text"
            name="avatarAlt"
            fullWidth
            value={formData.avatarAlt}
            onChange={handleInputChange}
            margin="normal"
            disabled={!isCurrentUser}
          />
          <TextField
            label="Banner URL"
            name="bannerUrl"
            fullWidth
            value={formData.bannerUrl}
            onChange={handleInputChange}
            margin="normal"
            disabled={!isCurrentUser}
          />
          <TextField
            label="Banner Alt Text"
            name="bannerAlt"
            fullWidth
            value={formData.bannerAlt}
            onChange={handleInputChange}
            margin="normal"
            disabled={!isCurrentUser}
          />
          <TextField
            id="bio-textfield"
            label="Profile Bio"
            name="bio"
            aria-label="Profile Bio"
            multiline
            rows={3}
            fullWidth
            value={formData.bio}
            onChange={handleInputChange}
            margin="normal"
            disabled={!isCurrentUser}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.venueManager}
                name="venueManager"
                onChange={handleInputChange}
                disabled={!isCurrentUser}
              />
            }
            label="Venue Manager"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: isCurrentUser
                ? "var(--button-bg-color)"
                : "var(--button-bg-color-hover-cancel)",
              color: isCurrentUser
                ? "var(--button-text-color)"
                : "var(--button-text-color-cancel)",
              fontWeight: "bold",
              "&:hover": {
                outline: isCurrentUser
                  ? "1px solid var(--border-color)"
                  : "none",
                backgroundColor: isCurrentUser
                  ? "var(--button-bg-color-hover)"
                  : "var(--button-bg-color-hover-cancel)",
                color: isCurrentUser
                  ? "var(--button-text-color-hover)"
                  : "var(--button-text-color-cancel)",
              },
              mt: 2,
            }}
            onClick={handleSubmit}
            disabled={!isCurrentUser}
          >
            {isCurrentUser ? "Submit" : "Can not edit - Not you"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              color: "var(--button-text-color-cancel)",
              backgroundColor: "var(--button-bg-color-cancel)",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "var(--button-bg-color-hover-cancel)",
                color: "var(--button-text-color)",
              },
              mt: 2,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
