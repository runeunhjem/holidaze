import styled from "styled-components";

export const BackgroundFader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay-color); // Use the CSS variable directly from useStore
  z-index: 1;
`;

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh; /* Ensure it covers the whole viewport height */
  background-image: var(--background-image);
  background-size: cover; /* Cover the container area */
  background-position: bottom; /* Center the background image */
  position: relative;
  overflow: hidden;
`;


export const Title = styled.h1`
  position: relative;
  z-index: 2; /* Ensure the text appears above the overlay */
`;

export const Subtitle = styled.h2`
  position: relative;
  z-index: 2; /* Ensure the text appears above the overlay */
`;

export const Description = styled.p`
  position: relative;
  z-index: 2; /* Ensure the text appears above the overlay */
`;
