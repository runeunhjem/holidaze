import { useEffect, useState } from "react";
import propTypes from "prop-types";
import * as S from "./index.styled";
import CountryFlag from "../CountryFlag";
import getCountryCode from "../../utils/getCountryCode";
import { BsStars } from "react-icons/bs";

function ImageGallery({ media, countryName, continent }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageVisible, setImageVisible] = useState(true);
  const [overlayData, setOverlayData] = useState({ countryCode: "", continentText: "" });

  useEffect(() => {
    const fetchedCountryCode = getCountryCode(countryName);
    const continentText = continent === "Unknown" || continent === "" ? "Unspecified" : continent;
    setOverlayData({ countryCode: fetchedCountryCode, continentText });
  }, [countryName, continent]);

  useEffect(() => {
    setImageVisible(true);
    const timer = setTimeout(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % media.length);
      setImageVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [selectedImageIndex, media.length]);

  const placeholderImage = "https://picsum.photos/400/600";

  if (media.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <S.Gallery>
      {media.map((img, index) => (
        <div
          key={index}
          className={`fade-effect ${isImageVisible && index === selectedImageIndex ? "visible" : "hidden"}`}
          style={{ position: "relative" }}>
          <S.StyledImg src={img.url || placeholderImage} alt={img.alt} />
          <S.ImageOverlay>{img.alt}</S.ImageOverlay>
          <S.TopOverlay>
            <S.OverlaySection>
              <CountryFlag countryCode={overlayData.countryCode} />
              {overlayData.continentText}
            </S.OverlaySection>
            <S.OverlaySection
              className="top-rated dark:text-yellow-400 text-yellow-700 w-full flex justify-end items-center me-3"
              sx={{
                color: "var(--yellow-500)",
              }}>
              <BsStars />
              Top Rated
            </S.OverlaySection>
            <S.OptionsIcon className="flex justify-end items-center" />
          </S.TopOverlay>
        </div>
      ))}
      <S.NavButton
        direction="left"
        onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : media.length - 1))}>
        &#10094;
      </S.NavButton>
      <S.NavButton direction="right" onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex + 1) % media.length)}>
        &#10095;
      </S.NavButton>
      <S.Thumbnails>
        {media.map((image, index) => (
          <S.ThumbnailImg
            key={index}
            src={image.url}
            alt={image.alt || "Thumbnail"}
            className={selectedImageIndex === index ? "selected" : ""}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </S.Thumbnails>
    </S.Gallery>
  );
}

ImageGallery.propTypes = {
  media: propTypes.arrayOf(
    propTypes.shape({
      url: propTypes.string.isRequired,
      alt: propTypes.string,
    })
  ).isRequired,
  countryName: propTypes.string.isRequired,
  continent: propTypes.string.isRequired,
};

export default ImageGallery;
