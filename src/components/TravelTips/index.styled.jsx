import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  margin-top: 2em;
`;

export const StyledHeading = styled.h1`
  color: var(--body-text-color);
  font-size: calc(24px + (40 - 24) * ((100vw - 320px) / (768 - 320)));
  width: 100% !important;

  @media (min-width: 769px) {
    font-size: 40px;
  }
`;

export const StyledText = styled.p`
  color: var(--body-text-color);
  font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (768 - 320)));
  width: 100% !important;
  margin-bottom: 2rem;

  @media (min-width: 769px) {
    font-size: 20px;
  }
`;

export const Link = styled.span`
  color: var(--link-color);
  text-decoration: underline;
  font-weight: 700;
  text-align: left;
  width: 100%;
  &:hover {
    color: var(--link-color-hover);
  }
`;
