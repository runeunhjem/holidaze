import { useNavigate } from "react-router-dom";
import NorwayImageGallery from "../NorwayImageGallery";
import * as S from "./index.styled";
import useStore from "../../hooks/useStore";

function TravelTips() {
  const { resetFilters, setFilter } = useStore();
  const navigate = useNavigate();

  const handleClick = () => {
    resetFilters();
    setFilter("country", "Norway");
    navigate("/destinations");
  };

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
      <div
        onClick={handleClick}
        className="mt-6 w-full max-w-800 cursor-pointer ps-1 text-left underline-offset-4"
      >
        <S.Link className="w-full max-w-800 px-2">
          All Norwegian destinations
        </S.Link>
      </div>
    </S.StyledContainer>
  );
}

export default TravelTips;
