import styled from "styled-components";
import { CgMoreVertical } from "react-icons/cg";

export const Gallery = styled.div`
  position: relative;
  width: 600px;
  /* height: 600px; // Adjust if you want a fixed height */
  max-width: 100%; // Adjust as needed
  margin: 0 auto;
  overflow: hidden;
  padding: 10px;
`;

export const StyledImg = styled.img`
  width: 600px;
  box-shadow: 1px 1px 6px 2px var(--overlay-color-hover);
  /* height: 600px; // Adjust if you want a fixed height */
  max-width: 100%; // Adjust as needed
  height: 400px; // Keeps the image aspect ratio
  object-fit: cover;
  border-radius: 10px;
  /* transition: opacity 1.6s ease; */
  transition: opacity 2s ease-in-out; // Smooth transition for opacity change
  opacity: 1;
  @media (max-width: 468px) {
    /* max-width: 300px; // Half size on smaller screens */
    height: 200px;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--overlay-color);
  color: var(--body-text-color);
  text-align: center;
  padding: 10px;
`;

export const TopOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--overlay-color);
  color: var(--body-text-color);
  padding: 10px;
`;

export const OverlaySection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  background-color: var(--overlay-color);
  color: var(--gray-400);
  box-shadow: 0 0 8px 1px var(--overlay-color);
  border-radius: 50%;
  font-size: 24px;
  padding: 4px 14px;
  z-index: 2; // Ensure it's above the image

  // Left or right positioning
  ${(props) => props.direction === "left" && `left: 20px;`}
  ${(props) => props.direction === "right" && `right: 20px;`}

  &:hover {
    color: var(--overlay-color-hover);
    background-color: var(--header-bg-color);
  }
`;

export const Thumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding-top: 10px;
`;

export const ThumbnailImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &.selected,
  &:hover {
    opacity: 1;
    border: 2px solid #06f;
  }
`;

export const OptionsIcon = styled(CgMoreVertical)`
  cursor: pointer;
  &:hover {
    color: lightgray; // Change color on hover
  }
`;