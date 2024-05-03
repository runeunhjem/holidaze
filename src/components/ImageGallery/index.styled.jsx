import styled from "styled-components";
import { CgMoreVertical } from "react-icons/cg";

export const Gallery = styled.div`
  position: relative;
  width: 600px;
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
  background-color: var(--overlay-cards);
  color: var(--body-text-color);
  text-align: center;
  padding: 2px 10px;
  border-radius: 0 0 10px 10px;
`;

export const TopOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--overlay-cards);
  color: var(--body-text-color);
  padding: 5px 10px;
transition: all 0.3s ease-in-out;
border-radius: 10px 10px 0 0;
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
  transform: translateY(-50%);
  background-color: var(--overlay-color);
  color: var(--gray-400);
  box-shadow: 0 0 8px 1px var(--overlay-color);
  border-radius: 50%;
  font-size: 24px; // Default size for large screens
  padding: 4px 14px; // Default padding for large screens
  z-index: 2; // Ensure it's above the image

  // Left or right positioning
  ${(props) => props.direction === "left" && `left: 20px;`}
  ${(props) => props.direction === "right" && `right: 20px;`}

  &:hover {
    color: var(--overlay-color-hover);
    background-color: var(--header-bg-color);
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    // Tablets and below
    font-size: 20px; // Smaller font size for smaller screens
    padding: 4px 10px; // Adjust padding for size
  }

  @media (max-width: 480px) {
    // Mobile devices
    font-size: 16px; // Even smaller font size for very small screens
    padding: 3px 8px; // Reduce padding to fit small screens
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
  border-radius: 16px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &.selected,
  &:hover {
    opacity: 1;
    border: 2px solid var(--border-color);
  }
`;

export const OptionsIcon = styled(CgMoreVertical)`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 24px;
  &:hover {
    color: var(--link-color);
    transform: scale(1.3);
  }
`;
