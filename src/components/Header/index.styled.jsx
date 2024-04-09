import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  padding: 10px 0;
  background-color: var(${({ theme }) => (theme === "dark" ? "--bg-header-dark" : "--bg-header-light")});
  color: var(${({ theme }) => (theme === "dark" ? "--text-color-dark" : "--text-color-light")});
  border-bottom: 1px solid var(${({ theme }) => (theme === "dark" ? "--border-color-dark" : "--border-color-dark")});
  transition: all 0.1s ease-in-out;
  /* padding: 1rem; */
  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: inherit;
    /* color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark" : "--link-color-light")}); */
    transition: all 0.3s ease;
    padding: 2px 4px;
    border-radius: 4px;
    &:hover {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
      /* transform: translateY(-2px) scale(0.99); */
      transition: all 0.3s ease;
      background-color: var(${({ theme }) => (theme === "dark" ? "--overlay-color-dark" : "--overlay-color-light")});
    }

    &.active {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
      background-color: var(${({ theme }) => (theme === "dark" ? "--overlay-color-dark" : "--overlay-color-light")});
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
      position: relative; /* Ensure the button is positioned relative to the header */
      z-index: 10; /* Ensure the menu button is above the opened menu */
    }

    .nav-links {
      display: none; /* Hide nav links on smaller screens */
      width: 100%; /* Take up the full width of the header */
      position: absolute; /* Position the menu absolutely within the header */
      top: 100%; /* Position the menu right below the header */
      right: 0; /* Align the menu to the right */
      background-color: var(
        ${({ theme }) => (theme === "dark" ? "--bg-header-dark" : "--bg-header-light")}
      ); /* Use the theme's background color */
      flex-direction: column;
      align-items: flex-end; /* Align menu items to the right */
      padding: 1rem; /* Add some padding around the menu items */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
      border-radius: 4px; /* Optional: Round the corners of the menu */
    }

    .nav-links.open {
      display: flex; /* Show when menu is open */
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
