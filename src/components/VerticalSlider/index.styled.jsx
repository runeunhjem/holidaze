import Slider from "react-slick";
import styled from "styled-components";

export const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    flex-direction: row;
    align-items: center !important;
    min-height: 70px;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background-color: var(--header-bg-color);

    svg {
      color: var(--border-color);
      margin-right: 10px;
      font-size: 32px;
    }
  }

  .slick-list {
    margin: 0 auto;
    padding: 0;
    /* max-width: 800px; */
    max-height: 300px;
  }

  .slick-track {
    align-items: center;
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
