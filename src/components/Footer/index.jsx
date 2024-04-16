// Footer component
import * as S from "./index.styled";
import useStore from "../../hooks/useStore";
import { Link } from "react-router-dom";

function Footer() {
  const { isDarkMode } = useStore();

  return (
    <S.StyledFooter theme={isDarkMode ? "dark" : "light"}>
      <S.FooterText>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</S.FooterText>
      <S.FooterText className="credits">
        Design and development by{" "}
        <Link to="https://runeunhjem.no" target="_new">
          Rune Unhjem
        </Link>
      </S.FooterText>
    </S.StyledFooter>
  );
}

export default Footer;
