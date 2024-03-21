// HomePage/index.styled.jsx
import styled from "styled-components";

export const HomeContainer = styled.div`
  /* text-align: center;
  background-image: url("src/assets/images/bg-light.jpg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  height: 50vh;
  align-items: bottom; */
  // Assuming you have set up CSS variables or a way to dynamically change --background-image based on the theme

  width: 100%;
  height: 100vh;
  background-image: var(--background-image);
  background-size: cover;
  background-position: center;
  transition: background-image 0.3s ease; /* Optional: smooth transition between themes */
`;

`;

// export const HeroBackground = styled.img`;
//   width: 100%;
//   height: 50vh;
// `;

export const Title = styled.h1`
  color: var(--primary-color); /* Example of using CSS variables */
`;

export const Subtitle = styled.h2`
  color: var(--secondary-color);
`;

export const Description = styled.p`
  color: var(--text-color);
`;
