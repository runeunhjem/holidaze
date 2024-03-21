// Footer component
import * as S from "./index.styled";
import useStore from "../../hooks/useStore";

function Footer() {
  const { isDarkMode } = useStore(); // Access the dark mode state

  return (
    <S.StyledFooter theme={isDarkMode ? "dark" : "light"}>
      <S.FooterText>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</S.FooterText>
      <S.FooterText className="credits">
        Design and development by{" "}
        <S.FooterLink href="https://runeunhjem.no" target="_new">
          Rune Unhjem
        </S.FooterLink>
      </S.FooterText>
    </S.StyledFooter>
  );
}

export default Footer;
