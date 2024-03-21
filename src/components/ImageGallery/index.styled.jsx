import styled from "styled-components";

export const Gallery = styled.div`
  position: relative;
  width: 600px;
  /* height: 600px; // Adjust if you want a fixed height */
  max-width: 100%; // Adjust as needed
  margin: 0 auto;
  overflow: hidden;
  padding: 10px;

  @media (max-width: 468px) {
    /* max-width: 300px; // Half size on smaller screens */
    /* height: 300px; */
  }
`;

export const StyledImg = styled.img`
  width: 600px;
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.4);
  /* height: 600px; // Adjust if you want a fixed height */
  max-width: 100%; // Adjust as needed
  height: 400px; // Keeps the image aspect ratio
  object-fit: cover;
  border-radius: 10px;
  @media (max-width: 468px) {
    /* max-width: 300px; // Half size on smaller screens */
    height: 200px;
  }
`;

export const NavButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  background-color: rgba(113, 126, 148, 0.5);
  color: white;
  box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.7);
  border-radius: 40%;
  font-size: 24px;
  padding: 4px 8px;
  z-index: 2; // Ensure it's above the image

  // Left or right positioning
  ${(props) => props.direction === "left" && `left: 20px;`}
  ${(props) => props.direction === "right" && `right: 20px;`}

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
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
