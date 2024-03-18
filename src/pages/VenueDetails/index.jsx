import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { fetchApi } from "../../utils/fetchApi";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        // Ensure the API call is made with the correct endpoint and parameters
        const response = await fetchApi("venueById", {}, { id: id });
        setVenue(response.data);
      } catch (error) {
        console.error("Failed to fetch venue details:", error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  // Ensure images exist and have a URL before passing to ImageGallery
  const images =
    venue?.media
      ?.filter((img) => img.url)
      .map((img) => ({
        url: img.url,
        alt: img.alt || "Venue image",
      })) || [];
  // console.log(venue);
  return (
    <div>
      <h2>{venue ? venue.name : "Loading venue details..."}</h2>
      {venue && images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}

export default VenueDetails;
