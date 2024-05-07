import { Link } from "react-router-dom";
import TravelTipsImageGallery from "../TravelTipsImageGallery";
import * as S from "./index.styled";

function TravelTips() {
  return (
    <S.StyledContainer>
      <div className="w-full max-w-800 md:px-4">
        <S.StyledHeading>Travel Tips</S.StyledHeading>
        <S.StyledText>
          Check out these shortcuts to some of our customer favorites!
        </S.StyledText>
      </div>
      <TravelTipsImageGallery />
      <Link
        to="/destinations"
        className="my-6 w-full max-w-800 ps-1 text-left underline-offset-4 "
      >
        <S.Link className="w-full max-w-800 px-2">All destinations</S.Link>
      </Link>
    </S.StyledContainer>
  );
}

export default TravelTips;
