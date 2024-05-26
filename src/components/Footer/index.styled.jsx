import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: 20px 0;
  text-align: center;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  background-color: var(
    ${({ theme }) =>
      theme === "dark" ? "--footer-bg-color-dark" : "--footer-bg-color-light"}
  );

  a {
    color: inherit;
    transition: all 0.3s ease;
    padding: 2px 4px;
    border-radius: 4px;
    &:hover {
      color: var(
        ${({ theme }) =>
          theme === "dark"
            ? "--link-color-dark-hover"
            : "--link-color-light-hover"}
      );
      transform: translateY(-2px) scale(1.01);
      transition: all 0.3s ease;
      background-color: var(
        ${({ theme }) =>
          theme === "dark" ? "--overlay-color" : "--overlay-color"}
      );
    }
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 600px) {
      align-items: center;
      &.footer-left {
        flex: 1;
      }
      &.footer-middle {
        flex: 1;
        gap: 12px;
        justify-content: center;
      }
      &.footer-right {
        flex: 1;
        gap: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
    }
  }

  .social-icons {
    display: flex;
    gap: 10px;
  }

  .social-icon {
    color: var(--link-color);
    font-size: 24px;
    transition: transform 0.3s;
  }

  .social-icon:hover {
    transform: scale(1.05);
  }

  .back-to-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    /* margin-right: 3rem; */
  }

  .back-to-top-icon {
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .back-to-top-icon:hover {
    transform: scale(1.15);
  }

  .footer-logo {
    height: 50px;
    margin-right: 2rem;
  }
`;

export const FooterText = styled.p`
  width: 100%;
  text-align: center;
`;
