import * as S from "./index.styled";
import travelTipsImage1 from "../../assets/images/travel-tip-image-1.png";
import travelTipsImage2 from "../../assets/images/travel-tip-image-2.png";
import travelTipsImage3 from "../../assets/images/travel-tip-image-3.png";
import travelTipsImage4 from "../../assets/images/travel-tip-image-4.png";

function TravelTipsImageGallery() {
  return (
    <S.StyledContainer className="flex w-full max-w-800 flex-wrap gap-3 px-0 md:px-0">
      <div className="flex w-full flex-nowrap gap-6">
        <S.ImageContainer className="w-1/2 relative">
          <S.StyledImage src={travelTipsImage1} alt="Sunny Favorites" />
          <S.ImageOverlay>Sunny Favorites</S.ImageOverlay>
        </S.ImageContainer>
        <S.ImageContainer className="w-1/2 relative">
          <S.StyledImage src={travelTipsImage2} alt="Pet Favorites" />
          <S.ImageOverlay>Pet Favorites</S.ImageOverlay>
        </S.ImageContainer>
      </div>
      <div className="flex w-full flex-nowrap gap-6">
        <S.ImageContainer className="w-1/2 relative">
          <S.StyledImage src={travelTipsImage3} alt="Kid Friendly" />
          <S.ImageOverlay>Kid Friendly</S.ImageOverlay>
        </S.ImageContainer>
        <S.ImageContainer className="w-1/2 relative">
          <S.StyledImage src={travelTipsImage4} alt="Adventure" />
          <S.ImageOverlay>Adventure</S.ImageOverlay>
        </S.ImageContainer>
      </div>
    </S.StyledContainer>
  );
}

export default TravelTipsImageGallery;
