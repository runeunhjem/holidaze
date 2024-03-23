import { useState } from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function CardImageCarousel({ images }) {
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


  return (
    <>
      {images.map((img, index) => (
        <div key={index} style={{ display: index === activeStep ? "block" : "none" }}>
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
            src={img}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === "rtl" ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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
};

export default CardImageCarousel;
