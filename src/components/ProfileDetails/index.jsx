import propTypes from "prop-types";
import { useState } from "react";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function ProfileDetails({ profile }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      <div className="relative">
        <hr
          style={{
            borderBottom: "1px solid var(--profile-text-color)",
            margin: "20px 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-15px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "5px 10px",
            borderRadius: "25px",
            backgroundColor: "var(--profile-text-color)",
            color: "var(--body-bg-color)",
            cursor: "pointer",
          }}
          aria-describedby={id}
          onClick={handleClick}
          className="bio"
        >
          Read Bio
        </div>
        <Popover
          sx={{
            pointerEvents: "none",
            marginTop: "10px",
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography
            style={{
              backgroundColor: "var(--profile-text-color-inverted)",
              border: "1px solid var(--profile-text-color)",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            {profile.bio || "No biography provided."}
          </Typography>
        </Popover>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div>Active Venues: {profile.activeVenues || 0}</div>
        <div>Your Venues’ Bookings: {profile.venueBookings || 0}</div>
        <div>Your Booked Stays: {profile.bookedStays || 0}</div>
        <div>Your Favorites: {profile.favorites || 0}</div>
      </div>
    </div>
  );
}

ProfileDetails.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileDetails;
