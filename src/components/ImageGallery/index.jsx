import { useEffect, useState } from "react";
import propTypes from "prop-types";
import * as S from "./index.styled";

function ImageGallery({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    // Start the fade-out effect
    setImageVisible(true);

    // Wait for the fade-out effect to complete, then change the image and fade it in
    const timer = setTimeout(() => {
      setSelectedImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        return nextIndex;
      });
      setImageVisible(true); // Now fade in the new image
    }, 1600); // This timeout should match your CSS transition duration

    return () => clearTimeout(timer);
  }, [selectedImageIndex, images.length]);

  const placeholderImage = "https://picsum.photos/400/600";

  return (
    <S.Gallery>
      <S.StyledImg
        src={images.length > 0 && images[selectedImageIndex] ? images[selectedImageIndex].url : placeholderImage}
        alt={
          images.length > 0 && images[selectedImageIndex] && images[selectedImageIndex].alt
            ? images[selectedImageIndex].alt
            : "Placeholder image"
        }
        className={`fade-effect ${isImageVisible ? "visible" : "hidden"}`} // Use fade-effect class for transitions
      />
      <S.NavButton
        direction="left"
        onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))}>
        &#10094;
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
      <S.NavButton direction="right" onClick={() => setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length)}>
        &#10095;
      </S.NavButton>
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
};

export default ImageGallery;
