import { Link } from "react-router-dom";
import NorwayImageGallery from "../NorwayImageGallery";
import * as S from "./index.styled";

function TravelTips() {
  return (
    <S.StyledContainer>
      <div className="w-full max-w-800 md:px-4">
        <S.StyledHeading>Visit Norway</S.StyledHeading>
        <S.StyledText>
          How about a scenic weekend with breathtaking nature in beautiful
          Norway?
        </S.StyledText>
      </div>
      <NorwayImageGallery />
      <Link
        to="/destinations"
        className="mt-6 w-full max-w-800 ps-1 text-left underline-offset-4"
      >
        <S.Link className="w-full max-w-800 px-2">
          All norwegian destinations
        </S.Link>
      </Link>
    </S.StyledContainer>
  );
}

export default TravelTips;
