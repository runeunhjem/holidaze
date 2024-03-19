import { useState } from "react";
import propTypes from "prop-types";
import * as S from "./index.styled";

function ImageGallery({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <S.Gallery>
      <S.StyledImg src={images[selectedImageIndex].url} alt={images[selectedImageIndex].alt || "Venue"} />
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
