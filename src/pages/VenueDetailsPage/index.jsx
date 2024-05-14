import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import { MdFastfood, MdLocationPin, MdPets } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { FiWifi } from "react-icons/fi";
import { TbParking } from "react-icons/tb";
import { sanitizeFields } from "../../utils/options";
import "./index.css";

function VenueDetailsPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      const { data, error } = await getVenueById(id);
      if (error) {
        console.error("Failed to fetch venue details:", error);
      } else if (data && data.data) {
        // Apply sanitation to the received data
        data.data.location.country = sanitizeFields(data.data.location.country);
        data.data.location.continent = sanitizeFields(
          data.data.location.continent,
        );
        setVenue(data.data);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        {venue.name || "Venue"}
      </h1>
      <ImageGallery
        media={venue.media || []}
        countryName={venue.location.country || "Unspecified"}
        continent={venue.location.continent || "Unspecified"}
        venue={venue}
      />

      <div className="mt-6 space-y-2">
        <div className="mb-3 flex align-middle">
          <MdLocationPin className="mr-2 text-2xl text-red-500" />
          <p className="font-bold tracking-wide">
            {venue.location.address}, {venue.location.zip}{" "}
            {venue.location.city || "Unspecified city"},
            {venue.location.country || "Unspecified country"}
          </p>
        </div>
        <hr />
        <p className="py-3 tracking-wider">
          {venue.description || "No description provided."}
        </p>

        <div className="details-container">
          <div className="details-left">
            <p className="font-bold underline underline-offset-4">
              Details:
            </p>
            <ul className="details-list">
              <li>
                <strong>Price:</strong> ${venue.price || "N/A"} / night
              </li>
              <li>
                <strong>Max Guests:</strong> {venue.maxGuests || "N/A"}
              </li>
              <li className="flex align-top">
                <strong>Rating:</strong>{" "}
                <RiStarSFill className="mt-0.3 inline text-xl text-yellow-500" />
                {venue.rating || "No rating"} stars
              </li>
            </ul>
          </div>

          {venue.meta && (
            <div className="details-right">
              <p className="font-bold underline underline-offset-4">
                Amenities:
              </p>
              <ul className="amenities-list">
                {venue.meta.wifi && (
                  <li className="flex">
                    <FiWifi className="amenities me-3 text-xl" />
                    Free Wi-Fi
                  </li>
                )}
                {venue.meta.parking && (
                  <li className="flex">
                    <TbParking className="amenities me-3 text-xl" />
                    Free Parking
                  </li>
                )}
                {venue.meta.breakfast && (
                  <li className="flex">
                    <MdFastfood className="amenities me-3 text-xl" />
                    Breakfast included
                  </li>
                )}
                {venue.meta.pets && (
                  <li className="flex">
                    <MdPets className="amenities me-3 text-xl" />
                    Pets Allowed
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {venue.bookings && venue.bookings.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Booked Dates</h2>
            <ul>
              {venue.bookings.map((booking, index) => (
                <li key={index}>
                  {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="pt-3">
          <strong>Venue added:</strong>{" "}
          {new Date(venue.created).toLocaleDateString()} by{" "}
          <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}>
            {venue.owner.name}
          </Link>
        </p>
        <p>
          <strong>Venue updated:</strong>{" "}
          {new Date(venue.updated).toLocaleDateString()} by{" "}
          <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}>
            {venue.owner.name}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
