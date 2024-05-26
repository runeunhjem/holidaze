import styled from "styled-components";

export const StyledContainer = styled.div`
  .image-container {
    transition: all 0.5s ease-in-out;
    border-radius: 15px;
    overflow: hidden;
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
