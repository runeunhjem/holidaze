import styled from "styled-components";

export const StyledContainer = styled.div`
  .image-container {
    transition: all 0.5s ease-in-out;
    border-radius: 15px;
  }
`;

export const StyledImage = styled.img`
  border-radius: 15px;
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  &:hover {
    transform: scale(1.15);
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 15px;
  width: 100%;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  text-align: center;
  background: var(--overlay-color);
  color: var(--body-text-color);
  padding: 2px 4px;
  font-size: calc(0.9rem + 0.1vw);
  border-radius: 0 0 5px 5px;
  width: 100%;
  border-top: 1px solid var(--border-color);
`;
