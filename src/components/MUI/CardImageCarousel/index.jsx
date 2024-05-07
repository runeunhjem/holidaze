import { useState, useEffect } from "react";
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

function CardImageCarousel({ images, countryName, venueId, continent }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
      }
    }, 3000); // Adjust autoplay interval as needed

    return () => clearInterval(interval);
  }, [autoplay, maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps,
    );
  };

  const countryCode = getCountryCode(countryName);
  const placeholderImage = "https://picsum.photos/300/200";

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
                src={img ? img : placeholderImage}
                alt={`Slide ${index + 1}`}
                loading="lazy"
              />
            </Link>
            <div className="info">
              <div className="text-sm">
                {continent === "Unknown" || continent === ""
                  ? "Unspecified"
                  : continent}
              </div>
              {countryCode && countryCode !== "Unknown" && (
                <div className="flag">
                  <CountryFlag countryCode={countryCode} />
                </div>
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
};

export default CardImageCarousel;
