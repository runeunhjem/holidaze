import PropTypes from "prop-types";
import { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";

const VenueOptionsDropdown = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    // Example sharing link - replace with your sharing logic
    window.open("https://example.com/share", "_blank");
    handleClose();
  };

  const handlePrint = () => {
    window.print();
    handleClose();
  };

  return (
    <div className="dropdown-container">
      <IconButton
        aria-controls={menuOpen ? "venue-options-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "var(--profile-text-color) !important",
        }}
        className="header-nav-links"
      >
        <CgMoreVertical />
      </IconButton>
      <Menu
        id="venue-options-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        sx={{
          ".MuiList-root": {
            backgroundColor: "var(--body-bg-color)",
            color: "var(--profile-text-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "5px",
          },
        }}
      >
        <MenuItem onClick={handleShare}>Share venue</MenuItem>
        <MenuItem onClick={handlePrint}>Print venue</MenuItem>
        <MenuItem onClick={onEdit}>Edit venue</MenuItem>
        <MenuItem onClick={onDelete}>Delete venue</MenuItem>
      </Menu>
    </div>
  );
};

VenueOptionsDropdown.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VenueOptionsDropdown;
