import styled from "styled-components";

export const HomeContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

export const HomeContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100%;
  flex-grow: 1; */
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
