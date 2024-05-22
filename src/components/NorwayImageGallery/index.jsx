import * as S from "./index.styled";
import norwayImage1 from "../../assets/images/norway-image-1.png";
import norwayImage2 from "../../assets/images/norway-image-2.png";
import norwayImage3 from "../../assets/images/norway-image-3.png";
import norwayImage4 from "../../assets/images/norway-image-4.png";
import norwayImage5 from "../../assets/images/norway-image-5.png";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

function NorwayImageGallery() {
  const { resetFilters, setFilter } = useStore();
  const navigate = useNavigate();

  const handleClick = () => {
    resetFilters();
    setFilter("country", "Norway");
    navigate("/destinations");
  };

  return (
    <S.StyledContainer className="flex w-full max-w-800 flex-wrap gap-3 px-0 md:px-0">
      <div className="w-full overflow-hidden cursor-pointer" onClick={handleClick}>
        <S.StyledImage
          className="w-full overflow-hidden"
          src={norwayImage1}
          alt="Norwegian fjords"
          loading="lazy"
        />
      </div>
      <div className="flex w-full flex-nowrap gap-6">
        <div className="w-1/2 overflow-hidden cursor-pointer" onClick={handleClick}>
          <S.StyledImage
            className="w-full"
            src={norwayImage2}
            alt="Breathtaking aurora"
            loading="lazy"
          />
        </div>
        <div className="flex w-1/2 flex-wrap gap-5">
          <div className="overflow-hidden cursor-pointer" onClick={handleClick}>
            <S.StyledImage
              src={norwayImage3}
              alt="Visit Trolltunga"
              loading="lazy"
            />
          </div>
          <div className="flex flex-nowrap gap-5 p-0">
            <S.ImageContainer className="image4 p-0 cursor-pointer" onClick={handleClick}>
              <S.StyledImage
                src={norwayImage4}
                alt="Magical evenings"
                loading="lazy"
              />
            </S.ImageContainer>
            <S.ImageContainer
              className="image5 flex justify-end p-0 cursor-pointer"
              onClick={handleClick}
            >
              <S.StyledImage
                src={norwayImage5}
                alt="Drive the infamous Trollstigen"
                loading="lazy"
              />
            </S.ImageContainer>
          </div>
        </div>
      </div>
    </S.StyledContainer>
  );
}

export default NorwayImageGallery;
