// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCalendarAlt, FaUtensils, FaParking } from "react-icons/fa";
import { StyledSlider } from "./index.styled";

function VerticalSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
  };

  return (
    <StyledSlider
      {...settings}
      className="vertical-slider w-full mt-6 px-0 sm:px-4 mb-3 sm:max-w-600 md:max-w-800 overflow-hidden mx-auto">
      <div className="slide-item">
        <FaCalendarAlt className="text-2xl" />
        <span className="vertical-text">Always free cancellation up until 4pm the day of arrival.</span>
      </div>
      <div className="slide-item">
        <FaUtensils className="text-2xl" />
        <span className="vertical-text">Many venues offer daily complementary breakfast.</span>
      </div>
      <div className="slide-item">
        <FaParking className="text-2xl" />
        <span className="vertical-text">Enjoy free parking in select locations around the world.</span>
      </div>
    </StyledSlider>
  );
}

export default VerticalSlider;
