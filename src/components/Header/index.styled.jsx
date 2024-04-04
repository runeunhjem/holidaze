import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  padding: 20px 0;
  background-color: var(${({ theme }) => (theme === "dark" ? "--bg-header-dark" : "--bg-header-light")});
  color: var(${({ theme }) => (theme === "dark" ? "--text-color-dark" : "--text-color-light")});
  border-bottom: 1px solid var(${({ theme }) => (theme === "dark" ? "--border-color-dark" : "--border-color-light")});
  transition: all 0.1s ease-in-out;
  padding: 1rem;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: inherit;
    transition: all 0.3s ease;
    padding: 2px 4px;
    border-radius: 4px;
    /* color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark" : "--link-color-light")}); */
    &:hover {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
      transform: translateY(-2px) scale(1.01);
      transition: all 0.3s ease;
      background-color: var(${({ theme }) => (theme === "dark" ? "--overlay-color-dark" : "--overlay-color-dark")});
    }
  }

  .menu-button {
    display: none; /* Hide by default, show in responsive design */
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .menu-button {
      display: block;
    }

    .nav-links {
      display: none; /* Hide nav links on smaller screens */
    }

    .nav-links.open {
      display: flex; /* Show when menu is open */
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const NavLink = styled(Link)`
  padding: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--link-hover-color);
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 1.5rem;
`;

// You can create additional styled components for other parts of the header as needed.
