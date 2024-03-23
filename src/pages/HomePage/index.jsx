import * as S from "./index.styled";
import useStore, { isAuthenticatedSelector } from "../../hooks/useStore";

function HomePage() {
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
