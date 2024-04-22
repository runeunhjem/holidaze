import styled from "styled-components";

export const StyledContainer = styled.div`
  .image-container {
    transition: all 0.5s ease-in-out;
    border-radius: 15px;
    overflow: hidden; // Ensures nothing spills outside the border radius
  }
.image4 {
  width: 70%;
}
.image5 {
  width: 30%;
}
`;

export const StyledImage = styled.img`
  border-radius: 15px;
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out; // Transition applies to all transform changes
  &:hover {
    transform: scale(1.15); // Scale up on hover
  }
`;

export const Link = styled.span`
  color: var(--link-color);
  text-decoration: underline;
  font-weight: 700;
  transition: color 0.5s ease-in-out; // Smooth transition for color change
  &:hover {
    color: var(--link-color-hover);
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden; // Ensures content doesn't spill out
  border-radius: 15px; // Optional: if you want rounded corners
  width: 100%; // Ensures the container takes the necessary width
`;