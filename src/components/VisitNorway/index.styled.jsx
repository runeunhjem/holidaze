
import styled from "styled-components";

// Styled container
export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

// Styled heading
export const StyledHeading = styled.h1`
  color: var(--body-text-color);
  /* padding: 0 1rem; */
  font-size: calc(24px + (40 - 24) * ((100vw - 320px) / (768 - 320)));

  @media (min-width: 769px) {
    font-size: 40px;
  }
`;


// Example of an additional styled component for text if needed
export const StyledText = styled.p`
  color: var(--body-text-color);
  /* padding: 0 1rem; */
  font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (768 - 320)));
margin-bottom: 2rem;

  @media (min-width: 769px) {
    font-size: 20px;
  }
`;


    // Styled image
    export const StyledImage = styled.img`
      border-radius: 15px;
    `;