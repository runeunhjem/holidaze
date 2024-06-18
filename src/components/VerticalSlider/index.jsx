import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCalendarAlt, FaUtensils, FaParking } from "react-icons/fa";
import { StyledSlider } from "./index.styled";
import { HiCurrencyDollar } from "react-icons/hi";

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
      className="vertical-slider mx-auto mb-3 mt-6 overflow-hidden px-0"
    >
      <div className="slide-item">
        <FaCalendarAlt className="text-2xl" />
        <span className="vertical-text">
          Always free cancellation up until 4pm the day of arrival.
        </span>
      </div>
      <div className="slide-item">
        <span className="icon-container rounded">
          <HiCurrencyDollar className="text-2xl" />
        </span>
        <span className="vertical-text">Payment on arrival.</span>
      </div>
      <div className="slide-item">
        <FaUtensils className="text-2xl" />
        <span className="vertical-text">
          Many venues offer daily complementary breakfast.
        </span>
      </div>
      <div className="slide-item">
        <FaParking className="text-2xl" />
        <span className="vertical-text">
          Enjoy free parking in select locations around the world.
        </span>
      </div>
    </StyledSlider>
  );
}

export default VerticalSlider;
