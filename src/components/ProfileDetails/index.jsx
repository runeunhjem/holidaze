// ProfileDetails.js
import PropTypes from "prop-types";
import { Popover, Typography } from "@mui/material";
import useStore from "../../hooks/useStore";

const ProfileDetails = ({
  viewedProfile,
  handleClick,
  open,
  anchorEl,
  handleClose,
}) => {
  const { favorites } = useStore();
  return (
    <div className="relative">
      <hr
        className="w-2/3 sm:w-1/2 md:w-1/3"
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "2px solid var(--profile-text-color)",
          backgroundColor: "transparent",
          height: "0px",
          // maxWidth: "60%",
          margin: "30px auto 20px auto",
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
        onClick={ handleClick }
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}
        className="bio"
      >
        Read Bio
      </div>
      <Popover
        sx={{ pointerEvents: "none", marginTop: "10px" }}
        id={viewedProfile.name}
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
            backgroundColor: "var(--header-bg-color)",
            color: "var(--profile-text-color)",
            border: "1px solid var(--profile-text-color)",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          {viewedProfile.bio || "No biography provided."}
        </Typography>
      </Popover>
      <div
        className="mx-auto flex max-w-300 flex-col items-center pt-6"
        style={{
          width: "200px",
        }}
      >
        <div className="min-w-300 mx-auto flex flex-wrap items-start text-left">
          <div className="min-w-300 w-full text-left">
            Active Venues: {viewedProfile.venues?.length || 0}
          </div>
          <div className="min-w-300 w-full text-left">
            Your Venues&apos; Bookings: {viewedProfile.venuesBookings ?? 0}
          </div>
        </div>
        <div className="min-w-300 mx-auto flex flex-wrap items-start text-left">
          <div className="min-w-300 w-full text-left">
            Your Bookings: {viewedProfile.bookings?.length || 0}
          </div>
          <div className="min-w-300 w-full text-left">
            Your Favorites: {(favorites ?? []).length}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileDetails.propTypes = {
  viewedProfile: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default ProfileDetails;
