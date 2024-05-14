import { useState, useEffect, useCallback } from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CountryFlag from "../../CountryFlag";
import getCountryCode from "../../../utils/getCountryCode.js";
import { sanitizeFields } from "../../../utils/options.js";
import { Link } from "react-router-dom";
import "./index.css";

function CardImageCarousel({ images, countryName, venueId, continent }) {
  const theme = useTheme();
  const maxSteps = images.length;
  const [activeStep, setActiveStep] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState([0]); // Start with the first image loaded

  const handleNext = useCallback(() => {
    if (maxSteps > 0) {
      const nextStep = (activeStep + 1) % maxSteps;
      setActiveStep(nextStep);
      updateLoadedIndices(nextStep);
    }
  }, [activeStep, maxSteps]);

  const handleBack = useCallback(() => {
    if (maxSteps > 0) {
      const nextStep = (activeStep - 1 + maxSteps) % maxSteps;
      setActiveStep(nextStep);
      updateLoadedIndices(nextStep);
    }
  }, [activeStep, maxSteps]);

  useEffect(() => {
    if (maxSteps > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000); // Auto-play functionality
      return () => clearInterval(interval);
    }
  }, [handleNext, maxSteps]); // `maxSteps` added to dependencies to handle empty or changed image arrays

  const updateLoadedIndices = (nextStep) => {
    setLoadedIndices((prev) => [...new Set([...prev, nextStep])]);
  };

  const countryCode = getCountryCode(countryName);
  const sanitizedContinent = sanitizeFields(continent);
  const sanitizedCountry = sanitizeFields(countryName);
  const truncateLength = 13;

  const placeholderImage = "https://picsum.photos/300/200";

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const capitalizedCountry = capitalizeFirstLetter(
    sanitizedCountry.length > truncateLength
      ? `${sanitizedCountry.substring(0, truncateLength)}...`
      : sanitizedCountry,
  );
  const capitalizedContinent = capitalizeFirstLetter(sanitizedContinent);
  // const capitalizedCountry = capitalizeFirstLetter(sanitizedCountry);

  return (
    <div className="image-carousel">
      {images.map((img, index) => (
        <div
          key={index}
          className="image-container"
          style={{
            opacity: index === activeStep ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        >
          <div className="image-wrapper">
            <Link to={`/venues/${venueId}`}>
              <Box
                component="img"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%", // Ensure images fit the container
                  objectFit: "cover", // Cover ensures the image fills the area without being stretched
                }}
                src={
                  loadedIndices.includes(index)
                    ? img || placeholderImage
                    : undefined
                }
                alt={`Slide ${index + 1}`}
                loading="lazy"
              />
            </Link>
            <div className="info">
              <div className="text-sm">
                <span
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  {capitalizedCountry}, {capitalizedContinent}
                </span>
              </div>
              {countryCode && countryCode !== "Unknown" && (
                <CountryFlag countryCode={countryCode} />
              )}
            </div>
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
    </div>
  );
}

CardImageCarousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string).isRequired,
  countryName: propTypes.string,
  venueId: propTypes.string.isRequired,
  continent: propTypes.string,
  country: propTypes.string,
};

export default CardImageCarousel;
