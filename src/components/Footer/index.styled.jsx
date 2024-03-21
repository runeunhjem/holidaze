import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: 20px 0;
  background-color: var(${({ theme }) => (theme === "dark" ? "--bg-footer-dark" : "--bg-footer-light")});
  color: var(${({ theme }) => (theme === "dark" ? "--text-color-dark" : "--text-color-light")});
  border-top: 1px solid var(${({ theme }) => (theme === "dark" ? "--border-color-dark" : "--border-color-light")});
  text-align: center;

  a {
    color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark" : "--link-color-light")});
    &:hover {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
    }
  }

  .credits a {
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .credits {
    margin-top: 10px;
  }
`;
