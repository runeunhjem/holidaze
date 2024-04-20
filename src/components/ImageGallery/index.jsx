import { useEffect, useState } from "react";
import propTypes from "prop-types";
import * as S from "./index.styled";
import CountryFlag from "../CountryFlag";
import getCountryCode from "../../utils/getCountryCode";

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
    if (media.length > 1) {
      const timer = setTimeout(() => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % media.length);
        setImageVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedImageIndex, media.length]);

  const placeholderImage = "https://picsum.photos/400/600";

  if (media.length === 0) {
    return <div>No images available.</div>;
  }

  const images = media.map((img) => ({
    url: img.url || placeholderImage, // Fallback to a placeholder if no URL
    alt: img.alt || `Illustration from ${countryName}`,
  }));

  return (
    <S.Gallery>
      {images.map((img, index) => (
        <div
          key={index}
          className={`fade-effect ${isImageVisible && index === selectedImageIndex ? "visible" : "hidden"}`}
          style={{ position: "relative" }}>
          <S.StyledImg src={img.url} alt={img.alt} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              borderRadius: "0 0 10px 10px",
              color: "var(--body-text-color)",
              backgroundColor: "var(--overlay-color)",
              padding: "10px 0",
            }}>
            {img.alt}
          </div>
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
                color: "var(--body-text-color)",
                backgroundColor: "var(--overlay-color)",
                padding: "2px 5px",
                borderRadius: "5px",
              }}>
              {overlayData.continentText}
            </div>
          )}
        </div>
      ))}
      {images.length > 1 && (
        <>
          <S.NavButton
            direction="left"
            onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))}>
            &#10094;
          </S.NavButton>
          <S.NavButton
            direction="right"
            onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length)}>
            &#10095;
          </S.NavButton>
        </>
      )}
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
