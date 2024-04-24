import { useState } from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CountryFlag from "../../CountryFlag";
import getCountryCode from "../../../utils/getCountryCode.js";
import { Link } from "react-router-dom";

function CardImageCarousel({ images, countryName, venueId, continent }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const countryCode = getCountryCode(countryName);
  const placeholderImage = "https://picsum.photos/300/200";

  return (
    <>
      {images.map((img, index) => (
        <div key={index} style={{ display: index === activeStep ? "block" : "none", position: "relative" }}>
          <Link to={`/venues/${venueId}`}>
            <Box
              component="img"
              sx={{
                height: 200, // Adjust height as needed
                display: "block",
                maxWidth: "100%",
                overflow: "hidden",
                width: 300, // Adjust width as needed
                objectFit: "cover",
              }}
              src={img ? img : placeholderImage}
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
          </Link>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "2px 5px",
              borderRadius: "5px",
            }}>
            {continent === "Unknown" || continent === "" ? "Unspecified" : continent}
          </div>
          {countryCode && countryCode !== "Unknown" && (
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              <CountryFlag countryCode={countryCode} />
            </div>
          )}
        </div>
      ))}
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} aria-label="Next image">
            Next
            {theme.direction === "rtl" ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} aria-label="Previous image">
            {theme.direction === "rtl" ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </>
  );
}

CardImageCarousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string).isRequired,
  countryName: propTypes.string,
  venueId: propTypes.string.isRequired,
  continent: propTypes.string,
};

export default CardImageCarousel;
