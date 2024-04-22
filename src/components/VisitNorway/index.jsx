import * as S from "./index.styled";
import norwayImage1 from "../../assets/images/norway-image-1.png";
import norwayImage2 from "../../assets/images/norway-image-2.png";
import norwayImage3 from "../../assets/images/norway-image-3.png";
import norwayImage4 from "../../assets/images/norway-image-4.png";
import norwayImage5 from "../../assets/images/norway-image-5.png";

function ImageGallery() {
  return (
    <div className="flex flex-wrap w-full gap-3 max-w-800">
      {/* <div className="w-full"> */}
      <div className="w-full">
        <S.StyledImage className="w-full"  src={norwayImage1} alt="Norwegian fjords" />
      </div>
      <div className="w-full flex flex-nowrap gap-3">
        <div className="w-1/2">
          <S.StyledImage className="w-full" src={norwayImage2} alt="Breathtaking aurora" />
        </div>
        <div className="w-1/2 flex flex-wrap">
          <div>
            <S.StyledImage src={norwayImage3} alt="Visit Trolltunga" />
          </div>
          <div className="flex flex-nowrap gap-1 w-full">
            <S.StyledImage className="p-1 w-2/3" src={norwayImage4} alt="Magical evenings" />
            <S.StyledImage className="p-1 w-1/3" src={norwayImage5} alt="Drive the infamous Trollstigen" />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

function VisitNorway() {
  return (
    <S.StyledContainer>
      <div className="text-left">
        <S.StyledHeading>Visit Norway</S.StyledHeading>
        {/* <S.StyledImage src="path-to-your-image.jpg" alt="Descriptive Alt Text" /> */}
        <S.StyledText>How about a scenic weekend with breathtaking nature in beautiful Norway ?.</S.StyledText>
      </div>
      <ImageGallery />
    </S.StyledContainer>
  );
}

export default VisitNorway;
