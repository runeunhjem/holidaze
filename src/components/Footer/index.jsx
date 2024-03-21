import { StyledFooter } from "./index.styled";
import useStore from "../../hooks/useStore";

function Footer() {
  const { isDarkMode } = useStore(); // Access the dark mode state

  return (
    <StyledFooter theme={isDarkMode ? "dark" : "light"}>
      <p className="copyright">&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
      <p className="credits">
        Design and development by{" "}
        <a href="https://runeunhjem.no" target="_new">
          {" "}
          Rune Unhjem
        </a>
      </p>
    </StyledFooter>
  );
}

export default Footer;
