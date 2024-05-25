import { useEffect } from "react";
import * as S from "./index.styled";
import TrendingCarousel from "../../components/TrendingCarousel";
import VerticalSlider from "../../components/VerticalSlider";
import VisitNorway from "../../components/VisitNorway";
import TravelTips from "../../components/TravelTips";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta"; // Import the utility function

function HomePage() {
  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Home",
      "Explore our wide range of destinations from around the world to find your special place.",
    );
  }, []);

  return (
    <S.HomeContainer>
      <TrendingCarousel />
      <div className="max-w-800">
        <VerticalSlider />
      </div>
      <VisitNorway />
      <div className="max-w-800">
        <VerticalSlider />
      </div>
      <TravelTips />
    </S.HomeContainer>
  );
}

export default HomePage;
