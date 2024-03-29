import { useEffect, useState } from "react";
import propTypes from "prop-types";
import * as S from "./index.styled";
import CountryFlag from "../CountryFlag";
import getCountryCode from "../../utils/getCountryCode";

function ImageGallery({ images, countryName, continent }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageVisible, setImageVisible] = useState(true);
  const [overlayData, setOverlayData] = useState({ countryCode: "", continentText: "" });

  useEffect(() => {
    // Fetch country code and continent text once on component mount
    const fetchedCountryCode = getCountryCode(countryName);
    const continentText = continent === "Unknown" || continent === "" ? "Unspecified" : continent;

    setOverlayData({ countryCode: fetchedCountryCode, continentText });
  }, [countryName, continent]);

  useEffect(() => {
    setImageVisible(true);
    const timer = setTimeout(() => {
      setSelectedImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        return nextIndex;
      });
      setImageVisible(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, [selectedImageIndex, images.length]);

  // const countryCode = getCountryCode(countryName);
  const placeholderImage = "https://picsum.photos/400/600";

  return (
    <S.Gallery>
      {images.length > 0 ? (
        images.map((img, index) => (
          <div
            key={index}
            className={`fade-effect ${isImageVisible && index === selectedImageIndex ? "visible" : "hidden"}`}
            style={{ position: "relative" }}>
            <S.StyledImg src={img.url ? img.url : placeholderImage} alt={img.alt || "Placeholder image"} />
            {overlayData.countryCode && overlayData.countryCode !== "Unknown" && (
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <CountryFlag countryCode={overlayData.countryCode} />
              </div>
            )}
            {overlayData.continentText && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: "2px 5px",
                  borderRadius: "5px",
                }}>
                {overlayData.continentText}
              </div>
            )}
          </div>
        ))
      ) : (
        <S.StyledImg src={placeholderImage} alt="Placeholder image" className="fade-effect visible" />
      )}
      <S.NavButton
        direction="left"
        onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))}>
        &#10094;
      </S.NavButton>
      <S.NavButton direction="right" onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length)}>
        &#10095;
      </S.NavButton>
      <S.Thumbnails>
        {images.map((image, index) => (
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
  images: propTypes.arrayOf(
    propTypes.shape({
      url: propTypes.string.isRequired,
      alt: propTypes.string,
    })
  ).isRequired,
  countryName: propTypes.string,
  continent: propTypes.string,
};

export default ImageGallery;
