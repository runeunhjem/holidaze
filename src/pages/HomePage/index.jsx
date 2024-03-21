import * as S from "./index.styled";

function HomePage() {
  return (
    <S.HomeContainer>
      {/* <S.HeroBackground src="../../assets/images/bg-light.jpg" alt="LightMode hero background" /> */}
      <S.Title>Welcome to Holidaze</S.Title>
      <S.Subtitle>Homepage</S.Subtitle>
      <S.Description>Discover and book your perfect stay at our curated venues.</S.Description>
      {/* Include any additional sections or components here */}
    </S.HomeContainer>
  );
}

export default HomePage;
