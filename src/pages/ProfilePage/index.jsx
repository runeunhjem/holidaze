import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useStore from "../../hooks/useStore";
import HeartToggle from "../../components/HeartToggle";
import { TbHomeEdit, TbUserEdit } from "react-icons/tb";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Popover, Typography } from "@mui/material";
// import ProfileDetails from "../../components/ProfileDetails";

function ProfilePage() {
  const { username } = useParams();
  const { fetchUserProfile } = useProfile();
  const { viewedProfile, favoriteProfiles, setViewedProfile } = useStore();

  useEffect(() => {
    if (username) {
      fetchUserProfile(username).then((profileData) => {
        if (profileData) {
          const isFavorite = favoriteProfiles.some(
            (p) => p.id === profileData.id,
          );
          setViewedProfile({ ...profileData, isFavorite });
        }
      });
    }
    document.title = "Holidaze - Profile";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Explore our wide range of destinations from around the world to find your special place.",
      );
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
  }, [
    username,
    fetchUserProfile,
    viewedProfile?.name,
    favoriteProfiles,
    setViewedProfile,
  ]);

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
    <main
      style={{
        color: "var(--profile-text-color)",
      }}
      className="min-h-screen"
    >
      <div className="relative -mt-9 w-full max-w-1200 mx-auto">
        <img
          src={viewedProfile.banner ? viewedProfile.banner.url : ""}
          alt={
            viewedProfile.banner ? viewedProfile.banner.alt : "Default banner"
          }
          className="h-64 w-full object-cover"
        />
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "var(--body-bg-color)",
            alignItems: "center",
            border: "10px solid var(--body-bg-color)",
          }}
          className="absolute left-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-full object-cover align-middle"
        >
          <img
            src={viewedProfile.avatar ? viewedProfile.avatar.url : ""}
            alt={
              viewedProfile.avatar ? viewedProfile.avatar.alt : "Default avatar"
            }
            style={{
              backgroundColor: "var(--body-bg-color)",
              border: "2px solid var(--profile-text-color)",
              borderRadius: "50%",
              height: "calc(40vw - 0.5vw)",
              maxHeight: "95%",
              width: "calc(40vw - 0.5vw)",
              maxWidth: "95%",
              marginTop: "-0.5vw",
            }}
            className="object-cover"
          />
          <div className="absolute bottom-0 right-1">
            <HeartToggle profile={viewedProfile} />
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-1200 justify-center px-4 pb-8 pt-20">
        <h1 className="text-center text-4xl font-bold capitalize">
          {viewedProfile.name}
        </h1>
        {viewedProfile.venueManager ? (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mt-2 flex"
          >
            <TbHomeEdit className="me-2 text-2xl" />
            <h2 className="text-center text-2xl font-bold capitalize">
              Venue Manager
            </h2>
          </div>
        ) : (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mt-2 flex"
          >
            <HiOutlineUser className="me-2 text-2xl" />
            <h2 className="text-center text-2xl font-bold capitalize">
              Registered User
            </h2>
          </div>
        )}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mt-2 flex"
        >
          <TbUserEdit className="me-2 text-2xl" />
          <h2 className="text-center text-2xl font-bold capitalize">
            Edit Profile
          </h2>
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mt-2 flex"
        >
          <MdOutlineMarkEmailRead className="text-1xl me-2" />
          <h3 className="text-1xl text-center font-bold">
            {viewedProfile.email}
          </h3>
        </div>
        {/* <hr /> */}
        <div className="relative">
          <hr
            style={{
              display: "flex", // Shows the horizontal line
              justifyContent: "center", // Centers the line
              borderTop: "2px solid var(--profile-text-color)", // Sets the color of the horizontal line
              backgroundColor: "transparent", // Ensures the background inside the hr is transparent
              height: "0px", // Removes any height, relying on border only
              maxWidth: "60%",
              margin: "30px auto 20px auto", // Adds vertical space around the hr
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
              {viewedProfile.bio || "No biography provided."}
            </Typography>
          </Popover>
        </div>
        {/* <hr /> */}
        <div
          className="pt-2 mx-auto w-1/2 flex flex-col items-start md:justify-center md:text-left md:flex-row md:gap-8"
          style={{ marginTop: "20px" }}
        >
          <div className="block text-left">
            <div>Active Venues: {viewedProfile.venues.length || 0}</div>
            <div>
              Your Venues&apos; Bookings: {viewedProfile.venuesBookings || 0}
            </div>
          </div>
          <div className="block text-left">
            <div>Your Booked Stays: {viewedProfile.bookings.length || 0}</div>
            <div>Your Favorites: {viewedProfile.favorites || 0}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
