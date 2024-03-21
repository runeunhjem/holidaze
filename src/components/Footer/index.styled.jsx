// index.styled.js
import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: 20px 0;
  background-color: ${({ theme }) => (theme === "dark" ? "var(--bg-footer-dark)" : "var(--bg-footer-light)")};
  color: ${({ theme }) => (theme === "dark" ? "var(--text-color-dark)" : "var(--text-color-light)")};
  border-top: 1px solid ${({ theme }) => (theme === "dark" ? "var(--border-color-dark)" : "var(--border-color-light)")};
  text-align: center;
  transition: all 0.1s ease-in-out;
`;

export const FooterText = styled.p`
  margin-top: 10px;
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => (theme === "dark" ? "var(--link-color-dark)" : "var(--link-color-light)")};
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => (theme === "dark" ? "var(--link-color-dark-hover)" : "var(--link-color-light-hover)")};
    transform: translateY(-2px) scale(1.01);
  }
`;
