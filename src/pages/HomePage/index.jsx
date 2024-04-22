import { useEffect } from "react";
import * as S from "./index.styled";
import TrendingCarousel from "../../components/TrendingCarousel";
import VerticalSlider from "../../components/VerticalSlider";
import VisitNorway from "../../components/VisitNorway";

function HomePage() {

useEffect(() => {
  document.title = "Holidaze - Home";
  let metaDescription = document.querySelector("meta[name='description']");
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.getElementsByTagName("head")[0].appendChild(metaDescription);
  }
  metaDescription.setAttribute(
    "content",
    "Explore our wide range of destinations from around the world to find your special place."
  );
}, []);

  return (
    <S.HomeContainer>
      <TrendingCarousel />
      <VerticalSlider />
      <VisitNorway />
    </S.HomeContainer>
  );
}

export default HomePage;
