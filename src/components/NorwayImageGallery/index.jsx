import * as S from "./index.styled";
import norwayImage1 from "../../assets/images/norway-image-1.png";
import norwayImage2 from "../../assets/images/norway-image-2.png";
import norwayImage3 from "../../assets/images/norway-image-3.png";
import norwayImage4 from "../../assets/images/norway-image-4.png";
import norwayImage5 from "../../assets/images/norway-image-5.png";

function NorwayImageGallery() {
  return (
    <S.StyledContainer className="flex w-full max-w-800 flex-wrap gap-3 px-0 md:px-0">
      <div className="w-full overflow-hidden">
        <S.StyledImage
          className="w-full overflow-hidden"
          src={norwayImage1}
          alt="Norwegian fjords"
        />
      </div>
      <div className="flex w-full flex-nowrap gap-6">
        <div className="w-1/2 overflow-hidden">
          <S.StyledImage
            className="w-full"
            src={norwayImage2}
            alt="Breathtaking aurora"
          />
        </div>
        <div className="flex w-1/2 flex-wrap gap-5">
          <div className="overflow-hidden ">
            <S.StyledImage src={norwayImage3} alt="Visit Trolltunga" />
          </div>
          <div className="flex flex-nowrap gap-5 p-0">
            <S.ImageContainer className="image4 p-0">
              <S.StyledImage
                // className="w-2/3 p-0"
                src={norwayImage4}
                alt="Magical evenings"
              />
            </S.ImageContainer>
            <S.ImageContainer className="image5 p-0 flex justify-end">
              <S.StyledImage
                // className="w-1/3 p-0"
                src={norwayImage5}
                alt="Drive the infamous Trollstigen"
              />
            </S.ImageContainer>
          </div>
        </div>
      </div>
      {/* </div> */}
    </S.StyledContainer>
  );
}

export default NorwayImageGallery;
