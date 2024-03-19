import propTypes from "prop-types";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"; // Importing from React Icons
// import { Card } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CardImageCarousel({ images }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={setActiveStep}
        enableMouseEvents>
        {images.map((img, index) => (
          <div key={index}>
            <Box
              component="img"
              sx={{
                height: "200px",
                // maxHeight: "200px",
                display: "block",
                maxWidth: "100%",
                overflow: "hidden",
                width: "300px",
                objectFit: "cover",
              }}
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </AutoPlaySwipeableViews>
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
