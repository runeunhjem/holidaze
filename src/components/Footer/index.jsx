// Footer component
import * as S from "./index.styled";
import useStore from "../../hooks/useStore";
import { Link } from "react-router-dom";

function Footer() {
  const { isDarkMode } = useStore();

  console.log("Current theme in Footer:", isDarkMode ? "dark" : "light"); // Debugging

  return (
    <S.StyledFooter theme={isDarkMode ? "dark" : "light"}>
      <S.FooterText>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</S.FooterText>
      <S.FooterText className="credits">
        Design and development by{" "}
        <Link to="https://runeunhjem.no" target="_new">
        {/* <S.FooterLink href="https://runeunhjem.no" target="_new" className="text-blue-700 dark:text-blue-300 hover:text-red-500 hover:dark:text-yellow-500"> */}
          Rune Unhjem
        </Link>
      </S.FooterText>
    </S.StyledFooter>
  );
}

export default Footer;
