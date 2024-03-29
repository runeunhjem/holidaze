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


  return (
    <S.Gallery>
      <S.StyledImg
        src={images[selectedImageIndex].url}
        alt={images[selectedImageIndex].alt || images[selectedImageIndex].alt}
        className={`dark:outline dark:outline-1 dark:outline-blue-900 ${isImageVisible ? "visible" : "hidden"}`}
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
