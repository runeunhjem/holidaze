import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { FaTrashAlt, FaEdit, FaPrint, FaShareAlt } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useStore from "../../hooks/useStore";
import "./index.css";

const VenueOptionsDropdown = ({ onEdit, onDelete, venueOwner = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const buttonRef = useRef(null);

  const { isAuthenticated } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    window.open("https://www.sharelinkgenerator.com/", "_blank");
    handleClose();
  };

  const handlePrint = () => {
    window.print();
    handleClose();
  };

  // Close the menu if a click occurs outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef]);

  return (
    <div className="dropdown-container">
      <IconButton
        aria-controls={menuOpen ? "venue-options-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
        ref={buttonRef}
        sx={{
          color: "var(--profile-text-color) !important",
          padding: "6px",
        }}
      >
        <CgMoreVertical
          className="menu-icon"
          style={{
            color: "var(--menu-items-text-color-hover)",
            fontSize: "1.2rem",
          }}
        />
        <span className="visually-hidden">Venue options</span>
      </IconButton>
      <Menu
        id="venue-options-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleClose}
        sx={{
          ".MuiList-root": {
            backgroundColor: "var(--body-bg-color)",
            color: "var(--profile-text-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            margin: "0",
            padding: "0",
          },
          marginTop: "12px",
          marginLeft: "5px",
        }}
      >
        <MenuItem className="menu-hover" onClick={handleShare}>
          <FaShareAlt
            style={{ marginRight: "8px", color: "var(--link-color)" }}
          />
          Share venue
        </MenuItem>
        <MenuItem className="menu-hover" onClick={handlePrint}>
          <FaPrint style={{ marginRight: "8px", color: "var(--link-color)" }} />
          Print venue
        </MenuItem>
        {isAuthenticated && venueOwner && (
          <div>
            <MenuItem className="menu-hover" onClick={onEdit}>
              <FaEdit
                style={{ marginRight: "8px", color: "var(--link-color)" }}
              />
              Edit venue
            </MenuItem>
            <MenuItem className="menu-hover" onClick={onDelete}>
              <FaTrashAlt
                style={{ marginRight: "8px", color: "var(--link-color)" }}
              />
              Delete venue
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

VenueOptionsDropdown.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  venueOwner: PropTypes.bool,
};

export default VenueOptionsDropdown;
