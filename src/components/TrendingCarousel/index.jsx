import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/images/hero-image-top-asian-pearl.png";
import image2 from "../../assets/images/hero-image-top-norwegian-summer.png";
import image3 from "../../assets/images/hero-image-top-pet-favorites.png";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import * as S from "./index.styled";
import "./index.css";

function TrendingCarousel() {
  const sliderContainerRef = useRef();
  const { resetFilters, setFilter } = useStore();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSlideClick = (filters) => {
    resetFilters();
    Object.entries(filters).forEach(([key, value]) => setFilter(key, value));
    navigate("/destinations");
  };

  return (
    <div
      className="slider-container mx-auto mt-9 w-full justify-center overflow-hidden sm:mt-9 sm:max-w-800 md:max-w-800"
      ref={sliderContainerRef}
    >
      <Slider {...settings}>
        <div
          className="image-slide-container cursor-pointer p-0"
          onClick={() => handleSlideClick({ continent: "Asia" })}
        >
          <div className="image-overlay-top">Trending Locations</div>
          <img src={image1} alt="Illustration of Asian Pearls" />
          <div className="image-overlay">Asian Pearls</div>
        </div>
        <div
          className="image-slide-container cursor-pointer p-0"
          onClick={() => handleSlideClick({ country: "Norway" })}
        >
          <div className="image-overlay-top">Nature Fans</div>
          <img src={image2} alt="Illustration of Norwegian Summer" />
          <div className="image-overlay">Norwegian Summer</div>
        </div>
        <div
          className="image-slide-container cursor-pointer p-0"
          onClick={() => handleSlideClick({ amenities: ["pets"] })}
        >
          <div className="image-overlay-top">Animal Lovers</div>
          <img src={image3} alt="Illustration of Pet Favorites" />
          <div className="image-overlay">Pet Favorites</div>
        </div>
      </Slider>
      <div
        onClick={() => {
          resetFilters();
          setFilter("country", "Norway");
          navigate("/destinations");
        }}
        className="cursor-pointer ps-1 underline-offset-4"
      >
        <S.Link className="w-full max-w-800 px-2">All our destinations</S.Link>
      </div>
    </div>
  );
}

export default TrendingCarousel;
