import { useEffect } from "react";
import useStore, { isAuthenticatedSelector } from "../../hooks/useStore";
import * as S from "./index.styled";
import "./index.css";

function HomePage() {

  const isAuthenticated = useStore(isAuthenticatedSelector);

  useEffect(() => {
    document.title = "Holidaze - Home";
  }, [isAuthenticated]); // Depend on isAuthenticated to re-run the animation when it changes

  return (
    <S.HomeContainer>
      <S.HomeContentWrapper>
        <S.Title>
          <span>{isAuthenticated ? "Welcome back Username" : "Welcome to Holidaze"}</span>
        </S.Title>
        <S.Subtitle>Homepage</S.Subtitle>
        <S.Description>Discover and book your perfect stay at our curated venues.</S.Description>

      </S.HomeContentWrapper>
    </S.HomeContainer>
  );
}

export default HomePage;
