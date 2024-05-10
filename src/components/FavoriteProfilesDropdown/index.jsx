import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";

const FavoriteProfilesDropdown = () => {
  const navigate = useNavigate();
  const { favoriteProfiles, removeFavoriteProfile, addFavoriteProfile } =
    useStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const defaultFavorites = [
      { id: "HolidazeManager", name: "HolidazeManager" },
      { id: "Spooky", name: "Spooky" },
      { id: "kyrre", name: "kyrre" },
      { id: "ninuskaninus", name: "ninuskaninus" },
      { id: "mrgold", name: "mrgold" },
      { id: "vaz01", name: "vaz01" },
    ];
    defaultFavorites.forEach((profile) => {
      if (!favoriteProfiles.some((p) => p.name === profile.name)) {
        addFavoriteProfile(profile);
      }
    });
  }, [favoriteProfiles, addFavoriteProfile]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (profileName) => {
    navigate(`/profile/${encodeURIComponent(profileName)}`);
    handleClose();
  };

  const handleRemove = (profileId, event) => {
    event.stopPropagation();
    removeFavoriteProfile(profileId);
    handleClose();
  };

  return (
    <div className="relative -mt-3 sm:mt-0">
      <IconButton
        aria-controls={open ? "favorite-profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "var(--profile-text-color) !important",
        }}
        className="header-nav-links"
      >
        ❤️
        <span className="ms-1">Managers</span>
      </IconButton>
      <Menu
        id="favorite-profile-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        sx={{
          ".MuiList-root": {
            // Targeting the root Paper component used by Menu
            backgroundColor: "var(--body-bg-color)",
            color: "var(--profile-text-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "5px",
          },
        }}
      >
        {favoriteProfiles.length > 0 ? (
          favoriteProfiles.map((profile) => (
            <MenuItem
              key={profile.id}
              onClick={() => handleNavigation(profile.name)}
              sx={{
                justifyContent: "space-between",
                borderRadius: "6px",
                "&:hover": {
                  color: "var(--button-text-color)",
                  backgroundColor: "var(--menu-hover-bg-color)",
                },
              }}
            >
              {profile.name}
              <RiDeleteBin6Line
                onClick={(e) => handleRemove(profile.id, e)}
                className="ms-3 cursor-pointer text-red-500 hover:text-red-700"
              />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No favorites added</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default FavoriteProfilesDropdown;
