import * as S from "./index.styled";
import useStore, { isAuthenticatedSelector } from "../../hooks/useStore";
import { useEffect } from "react";

document.addEventListener("DOMContentLoaded", function () {
  var content = document.querySelector(".content");
  if (content) {
    content.style.height = window.innerHeight + "px";
  }
});

function HomePage() {
  useEffect(() => {
    document.title = "Holidaze - Home";
  }, []);

  const isAuthenticated = useStore(isAuthenticatedSelector);
  return (
    <S.HomeContainer>
      <S.BackgroundFader />
      <S.HomeContentWrapper>
        <S.Title>
          {/* Username should be shown behind Holidaze if user is authenticated */}
          <span>{isAuthenticated ? "Welcome back Username" : "Welcome to Holidaze"}</span>
        </S.Title>
        <S.Subtitle>Homepage</S.Subtitle>
        <S.Description>Discover and book your perfect stay at our curated venues.</S.Description>
      </S.HomeContentWrapper>
    </S.HomeContainer>
  );
}

export default HomePage;
