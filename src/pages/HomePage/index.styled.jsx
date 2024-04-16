import styled from "styled-components";

//about-section p-4 md:p-8
export const HomeContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  background-image: var(--background-image);
  background-size: cover;
  background-position: bottom;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

export const BackgroundFader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--body-bg-color);
  color: var(--body-text-color);
  z-index: 1;
`;

export const HomeContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.h1`
  position: relative;
  z-index: 2;
`;

export const Subtitle = styled.h2`
  position: relative;
  z-index: 2;
`;

export const Description = styled.p`
  position: relative;
  z-index: 2;
`;
