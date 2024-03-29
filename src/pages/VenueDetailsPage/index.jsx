import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { fetchApi } from "../../utils/fetchApi";

function VenueDetailsPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetchApi("venueById", {}, { id });
        setVenue(response); // Assuming the API response matches the provided structure
      } catch (error) {
        console.error("Failed to fetch venue details:", error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  const images = venue.media.map((url) => ({
    url,
    alt: `Illustration of ${venue.name}`,
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{venue.name}</h1>
      <ImageGallery images={images} countryName={venue.location.country} continent={venue.location.continent} />
      <div className="mt-6 space-y-2">
        <p>{venue.description}</p>
        <p>
          <strong>Price:</strong> ${venue.price}
        </p>
        <p>
          <strong>Max Guests:</strong> {venue.maxGuests}
        </p>
        <p>
          <strong>Rating:</strong> {venue.rating} stars
        </p>
        <div>
          <strong>Amenities:</strong>
          <ul>
            {venue.meta.wifi && <li>Wi-Fi</li>}
            {venue.meta.parking && <li>Parking</li>}
            {venue.meta.breakfast && <li>Breakfast</li>}
            {venue.meta.pets && <li>Pets Allowed</li>}
          </ul>
        </div>
        <div>
          <strong>Location:</strong>
          <p>
            {venue.location.address}, {venue.location.city}, {venue.location.zip}, {venue.location.country}
          </p>
          <p>{venue.location.continent}</p>
        </div>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
