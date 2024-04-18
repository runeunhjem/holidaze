import { useEffect } from "react";
import useStore, { isAuthenticatedSelector } from "../../hooks/useStore";
import * as S from "./index.styled";

import TrendingCarousel from "../../components/TrendingCarousel";
// import SingleButton from "../../components/MUI/SingleButton";
// import { Link } from "react-router-dom";

function HomePage() {
  const isAuthenticated = useStore(isAuthenticatedSelector);

  useEffect(() => {
    document.title = "Holidaze - Home";
  }, [isAuthenticated]); // Depend on isAuthenticated to re-run the animation when it changes

  return (
    <S.HomeContainer>
      <TrendingCarousel />

    </S.HomeContainer>
  );
}

export default HomePage;
