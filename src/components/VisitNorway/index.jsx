import { Link } from "react-router-dom";
import NorwayImageGallery from "../NorwayImageGallery";
import * as S from "./index.styled";

function VisitNorway() {
  return (
    <S.StyledContainer>
      <div className="w-full max-w-800 md:px-4">
        <S.StyledHeading>Visit Norway</S.StyledHeading>
        <S.StyledText>
          How about a scenic weekend with breathtaking nature in beautiful
          Norway ?.
        </S.StyledText>
      </div>
      <NorwayImageGallery />
      <Link to="/destinations" className="my-6 w-full max-w-800 ps-1 text-left">
        <S.Link className="w-full max-w-800 md:px-4">
          All norwegian destinations
        </S.Link>
      </Link>
    </S.StyledContainer>
  );
}

export default VisitNorway;
