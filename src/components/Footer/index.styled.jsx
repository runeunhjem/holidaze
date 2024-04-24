import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: 20px 0;
  text-align: center;
  transition: all 0.1s ease-in-out;

  a {
    color: inherit;
    transition: all 0.3s ease;
    padding: 2px 4px;
    border-radius: 4px;
    &:hover {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
      transform: translateY(-2px) scale(1.01);
      transition: all 0.3s ease;
      background-color: var(${({ theme }) => (theme === "dark" ? "--overlay-color" : "--overlay-color")});
    }
  }
`;

export const FooterText = styled.p`
  margin-top: 10px;
`;
