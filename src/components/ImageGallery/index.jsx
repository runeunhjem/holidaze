import propTypes from "prop-types";
import { useState } from "react";
import "./index.css";

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt !== null && selectedImage.alt !== undefined ? selectedImage.alt : "Image of venue"}
          className="main-pic"
        />
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`thumbnail ${selectedImage.url === image.url ? "selected" : ""}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
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
