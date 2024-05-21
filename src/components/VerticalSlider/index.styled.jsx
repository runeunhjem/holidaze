import Slider from "react-slick";
import styled from "styled-components";

export const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex; // Ensure this is set to flex and not inline-flex if having issues
    flex-direction: row;
    align-items: center !important;
    min-height: 70px;
    justify-content: center; // Align content to the start to keep text next to the icon
    padding: 10px;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background-color: var(--header-bg-color);

    svg {
      color: var(--border-color);
      margin-right: 10px;
      font-size: 32px; // Adjust icon size as needed
    }
  }

  .slick-list {
    margin: 0 auto;
    padding: 0;
    /* max-width: 800px; */
    max-height: 300px; // Adjust based on your needs
  }

  .slick-track {
    align-items: center; // Ensure items within the track are also centered vertically
  }

  .slide-item {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 100% !important;
  }
  .vertical-text {
    font-size: calc(0.8rem + 0.2vw);
  }
`;
