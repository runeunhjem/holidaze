import { useState, useMemo } from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CountryFlag from "../../CountryFlag";
import getCountryCode from "../../../utils/getCountryCode.js";
import { Link } from "react-router-dom";
import "./index.css";
import Popover from "@mui/material/Popover"; // Import Popover component
import VenuePopover from "../../VenuePopover";

function CardImageCarousel({ images, countryName, venueId, continent }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const [hoveredVenue, setHoveredVenue] = useState(null); // Track hovered venue
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for Popover

  const countryCode = getCountryCode(countryName);
  const placeholderImage = "https://picsum.photos/300/200";

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps,
    );
  };

  const handleHover = (event, venue) => {
    setHoveredVenue(venue);
    setAnchorEl(event.currentTarget); // Set anchor element for Popover
  };

  const handleClosePopover = () => {
    setHoveredVenue(null);
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  return (
    <div className="image-carousel">
      {images.map((img, index) => (
        <div
          key={index}
          className="image-container"
          onMouseEnter={(e) => handleHover(e, { venueId, continent })}
          onMouseLeave={handleClosePopover}
        >
          <Link to={`/venues/${venueId}`}>
            <div className="image-wrapper">
              <Box
                component="img"
                src={img ? img : placeholderImage}
                alt={`Slide ${index + 1}`}
                loading="lazy"
              />
            </div>
          </Link>
          <div className="info">
            <div>
              {continent === "Unknown" || continent === ""
                ? "Unspecified"
                : continent}
            </div>
            {countryCode && countryCode !== "Unknown" && (
              <div>
                <CountryFlag countryCode={countryCode} />
              </div>
            )}
          </div>
        </div>
      ))}
      <MobileStepper
        className="mobile-stepper"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            aria-label="Next image"
          >
            Next
            {theme.direction === "rtl" ? (
              <MdKeyboardArrowLeft />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            aria-label="Previous image"
          >
            {theme.direction === "rtl" ? (
              <MdKeyboardArrowRight />
            ) : (
              <MdKeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />

      {/* Popover for venue info */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {hoveredVenue && (
          <VenuePopover
            selectedVenue={hoveredVenue}
            onClose={handleClosePopover}
          />
        )}
      </Popover>
    </div>
  );
}

CardImageCarousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string).isRequired,
  countryName: propTypes.string,
  venueId: propTypes.string.isRequired,
  continent: propTypes.string,
};

export default CardImageCarousel;
