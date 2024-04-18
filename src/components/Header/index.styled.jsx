import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  padding: 10px 10px 10px 10px;
  transition: all 0.1s ease-in-out;
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
    transition: all 0.3s ease;
    padding: 2px 4px;
    border-radius: 4px;
    &:hover {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
      transition: all 0.3s ease;
      background-color: var(${({ theme }) => (theme === "dark" ? "--overlay-color-dark" : "--overlay-color-light")});
    }

    &.active {
      color: var(${({ theme }) => (theme === "dark" ? "--link-color-dark-hover" : "--link-color-light-hover")});
      background-color: var(${({ theme }) => (theme === "dark" ? "--overlay-color-dark" : "--overlay-color-light")});
    }
  }

  .menu-button {
    display: none;
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .menu-button {
      display: block;
      position: relative;
      z-index: 10;
    }

    .nav-links {
      display: none;
      width: 100%;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: var(${({ theme }) => (theme === "dark" ? "--bg-header-dark" : "--bg-header-light")});
      flex-direction: column;
      align-items: flex-end;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    .nav-links.open {
      display: flex;
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
