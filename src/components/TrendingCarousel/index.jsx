import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import image1 from "../../assets/images/hero-image-top-asian-pearl.png";
import image2 from "../../assets/images/hero-image-top-norwegian-summer.png";
import image3 from "../../assets/images/hero-image-top-pet-favorites.png";
import { Link } from "react-router-dom";
import * as S from "./index.styled";

function TrendingCarousel() {
  const sliderContainerRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
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

  return (
    <div className="slider-container w-full mt-3 sm:max-w-600 md:max-w-800 overflow-hidden mx-auto" ref={sliderContainerRef}>
      <Slider {...settings}>
        <div className="p-0 image-slide-container">
          <div className="image-overlay-top">Trending Locations</div>
          <img src={image1} alt="Asian Pearls" />
          <div className="image-overlay">Asian Pearls</div>
        </div>
        <div className="p-0 image-slide-container">
          <div className="image-overlay-top">Nature Fans</div>
          <img src={image2} alt="Norwegian Summer" />
          <div className="image-overlay">Norwegian Summer</div>
        </div>
        <div className="p-0 image-slide-container">
          <div className="image-overlay-top">Animal Lovers</div>
          <img src={image3} alt="Pet Favorites" />
          <div className="image-overlay">Pet Favorites</div>
        </div>
      </Slider>
      <Link to="/destinations" className="ps-2 sm:ps-0">
        <S.Link>Check out all our destinations</S.Link>
      </Link>
    </div>
  );
}

export default TrendingCarousel;