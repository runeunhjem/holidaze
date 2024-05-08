import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  padding: 10px 10px 0px 10px;
  transition: all 0.1s ease-in-out;
  background-color: var(
    --header-bg-color
  ); /* Use global variable for background */
  border-bottom: 1px solid var(--border-color); /* Use global variable for border */

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
      color: var(--link-color-hover); /* Use global variable for hover color */
      background-color: var(
        --overlay-color
      ); /* Use global variable for background on hover */
    }

    &.active {
      color: var(
        --link-color-hover
      ); /* Use global variable for active link color */
      background-color: var(
        --overlay-color
      ); /* Use global variable for active link background */
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
      background-color: var(
        --header-bg-color
      ); /* Use global variable for background */
      flex-direction: column;
      align-items: flex-end;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
      border-radius: 4px;
    }

    .nav-links.open {
      display: flex;
    }
  }
`;
