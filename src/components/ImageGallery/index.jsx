import { useEffect, useState } from "react";
import propTypes from "prop-types";
import * as S from "./index.styled";
import CountryFlag from "../CountryFlag";
import getCountryCode from "../../utils/getCountryCode";
import { BsStars } from "react-icons/bs";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import useStore from "../../hooks/useStore";
import "./index.css";

function ImageGallery({ media, countryName, continent, venue }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageVisible, setImageVisible] = useState(true);
  const [overlayData, setOverlayData] = useState({
    countryCode: "",
    continentText: "",
  });
  const { favorites, addFavoriteVenue, removeFavoriteVenue } = useStore();

  const isFavorite = (venueId) =>
    favorites.some((favorite) => favorite.id === venueId);

  const toggleFavorite = (venue) => {
    if (isFavorite(venue.id)) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
  };

  useEffect(() => {
    const fetchedCountryCode = getCountryCode(countryName);
    const continentText =
      continent === "Unknown" || continent === "" ? "Unspecified" : continent;
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
    <div className="gallery-wrapper">
      <S.Gallery>
        {media.map((img, index) => (
          <div
            key={index}
            className={`fade-effect ${isImageVisible && index === selectedImageIndex ? "visible" : "hidden1"}`}
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              overflow: "hidden",
              padding: 0,
              borderRadius: "20px",
            }}
          >
            <S.StyledImg src={img.url || placeholderImage} alt={img.alt} />
            <S.ImageOverlay>{img.alt}</S.ImageOverlay>
            <S.TopOverlay>
              <S.OverlaySection>
                <CountryFlag countryCode={overlayData.countryCode} />
                {overlayData.continentText}
              </S.OverlaySection>
              <S.OverlaySection className="top-rated me-3 flex w-full items-center justify-end text-yellow-700 dark:text-yellow-400">
                {venue.rating > 4 && (
                  <>
                    <BsStars />
                    Top Rated
                  </>
                )}
              </S.OverlaySection>
              <S.OptionsIcon className="flex items-center justify-end" />
            </S.TopOverlay>
            <div
              className="favorite-overlay bg-none"
              onClick={() => toggleFavorite(venue)}
            >
              {isFavorite(venue.id) ? (
                <TbHeartFilled className="text-lg text-red-500" />
              ) : (
                <TbHeart className="text-lg text-red-500" />
              )}
            </div>
          </div>
        ))}
        <S.NavButton
          direction="left"
          onClick={() =>
            setSelectedImageIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : media.length - 1,
            )
          }
        >
          &#10094;
        </S.NavButton>
        <S.NavButton
          direction="right"
          onClick={() =>
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % media.length)
          }
        >
          &#10095;
        </S.NavButton>
      </S.Gallery>
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
    </div>
  );
}

ImageGallery.propTypes = {
  media: propTypes.arrayOf(
    propTypes.shape({
      url: propTypes.string.isRequired,
      alt: propTypes.string,
    }),
  ).isRequired,
  venue: propTypes.object.isRequired,
  countryName: propTypes.string.isRequired,
  continent: propTypes.string.isRequired,
};

export default ImageGallery;
