import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as S from "./index.styled";
import CountryFlag from "../CountryFlag";
import getCountryCode from "../../utils/getCountryCode";
import { BsStars } from "react-icons/bs";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { FaFire } from "react-icons/fa";
import useStore from "../../hooks/useStore";
import { sanitizeFields } from "../../utils/options";
import VenueOptionsDropdown from "../VenueOptionsDropdown";
import "./index.css";

function ImageGallery({
  media,
  countryName,
  continent,
  venue,
  onEdit,
  onDelete,
  venueOwner,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageVisible, setImageVisible] = useState(true);
  const { favorites, addFavoriteVenue, removeFavoriteVenue } = useStore();
  const [overlayData, setOverlayData] = useState({
    countryCode: getCountryCode(countryName || ""),
    continentText: continent || "Unspecified",
  });

  const isFavorite = (venueId) =>
    favorites.some((favorite) => favorite.id === venueId);

  const toggleFavorite = () => {
    if (isFavorite(venue.id)) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
  };

  useEffect(() => {
    const fetchedCountryCode = getCountryCode(countryName);
    const sanitizedContinent = sanitizeFields(continent);
    setOverlayData({
      countryCode: fetchedCountryCode,
      continentText: sanitizedContinent,
    });
  }, [countryName, continent]);

  useEffect(() => {
    setImageVisible(true);
    const timer = setTimeout(() => {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex + 1) % (media.length || 1),
      ); // Avoid division by zero
      setImageVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [selectedImageIndex, media.length]);

  if (!media || media.length === 0) {
    return <div>No images available.</div>;
  }

  const placeholderImage = "https://picsum.photos/400/600";

  return (
    <div className="gallery-container">
      <VenueOptionsDropdown
        onEdit={onEdit}
        onDelete={onDelete}
        venueOwner={venueOwner}
      />
      <div className="gallery-wrapper">
        <S.Gallery>
          {media.map((img, index) => (
            <div
              key={index}
              className={`fade-effect ${
                isImageVisible && index === selectedImageIndex
                  ? "visible"
                  : "hidden1"
              }`}
              style={{
                width: "100%",
                maxWidth: "100%",
                margin: "0 auto",
                overflow: "hidden",
                padding: 0,
                borderRadius: "20px",
              }}
            >
              <S.StyledImg
                src={img.url || placeholderImage}
                alt={img.alt || "Illustration from the venue"}
              />
              <S.ImageOverlay>
                {img.alt || "Illustration from the venue"}
              </S.ImageOverlay>
              <S.TopOverlay>
                <S.OverlaySection>
                  <CountryFlag countryCode={overlayData.countryCode} />
                  {overlayData.continentText}
                </S.OverlaySection>
                <S.OverlaySection
                  className="top-rated me-12 flex w-full items-center justify-end"
                  style={{
                    color: "var(--top-rated-color)",
                  }}
                >
                  {venue.bookings?.length > 5 && (
                    <div
                      className="mr-3 flex items-center"
                      style={{
                        color: "var(--popular-color)",
                      }}
                    >
                      <FaFire />
                      <span className="hide-on-mobile ml-1">Popular</span>
                    </div>
                  )}
                  {venue.rating > 4 && (
                    <div className="flex whitespace-nowrap">
                      <BsStars />
                      Top Rated
                    </div>
                  )}
                </S.OverlaySection>
              </S.TopOverlay>
              <div
                className="favorite-overlay bg-none"
                onClick={toggleFavorite}
              >
                {isFavorite(venue.id) ? (
                  <TbHeartFilled className="text-lg text-red-500" />
                ) : (
                  <TbHeart className="text-lg text-red-500" />
                )}
              </div>
            </div>
          ))}
          {media.length > 1 && (
            <div>
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
                  setSelectedImageIndex(
                    (prevIndex) => (prevIndex + 1) % media.length,
                  )
                }
              >
                &#10095;
              </S.NavButton>
            </div>
          )}
        </S.Gallery>
        <S.Thumbnails>
          {media.map((image, index) => (
            <S.ThumbnailImg
              key={index}
              src={image.url || placeholderImage}
              alt={image.alt || "Thumbnail"}
              className={selectedImageIndex === index ? "selected" : ""}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </S.Thumbnails>
      </div>
    </div>
  );
}

ImageGallery.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
  venue: PropTypes.object.isRequired,
  countryName: PropTypes.string.isRequired,
  continent: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  venueOwner: PropTypes.bool.isRequired,
};

export default ImageGallery;
