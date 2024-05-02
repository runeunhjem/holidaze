import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

function VenueDetailsPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      const { data, error } = await getVenueById(id);
      if (error) {
        console.error("Failed to fetch venue details:", error);
      } else {
        setVenue(data.data);
      }
    };

    fetchVenueDetails();
  }, [id]);

  useEffect(() => {
    if (venue) {
      document.title = `${venue.name || "Venue"} - Venue Details`;
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.getElementsByTagName("head")[0].appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        "content",
        `${venue.name || "Venue"} offers a unique experience with its amenities. Located in ${venue.location?.city || "Unknown city"}, it provides a perfect getaway with a rating of ${venue.rating || "N/A"}.`,
      );
    }
  }, [venue]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  const highlightWithRanges = venue.bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        {venue.name || "Venue"}
      </h1>
      <ImageGallery
        media={venue.media}
        countryName={venue.location?.country || "Unknown country"}
        continent={venue.location?.continent || "Unknown continent"}
        venue={venue}
      />
      <div className="mt-6 space-y-2">
        <p>{venue.description || "No description available."}</p>
        <p>
          <strong>Price:</strong> ${venue.price || "N/A"}
        </p>
        <p>
          <strong>Max Guests:</strong> {venue.maxGuests || "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {venue.rating || "N/A"} stars
        </p>
        <p>
          <strong>Venue added:</strong>{" "}
          {venue.created ? new Date(venue.created).toLocaleDateString() : "N/A"}{" "}
          by
          {venue.owner?.name ? (
            <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}>
              {" "}
              {venue.owner.name}
            </Link>
          ) : (
            " Unknown owner"
          )}
        </p>
        <p>
          <strong>Venue updated:</strong>{" "}
          {venue.updated ? new Date(venue.updated).toLocaleDateString() : "N/A"}{" "}
          by
          {venue.owner?.name ? (
            <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}>
              {" "}
              {venue.owner.name}
            </Link>
          ) : (
            " Unknown owner"
          )}
        </p>

        <div>
          <strong>Amenities:</strong>
          <ul>
            {venue.meta?.wifi && <li>Wi-Fi</li>}
            {venue.meta?.parking && <li>Parking</li>}
            {venue.meta?.breakfast && <li>Breakfast</li>}
            {venue.meta?.pets && <li>Pets Allowed</li>}
          </ul>
        </div>

        <div>
          <strong>Location:</strong>
          <p>
            {venue.location?.address || "N/A"},{" "}
            {venue.location?.city || "Unknown city"},{" "}
            {venue.location?.zip || "Unknown zip"},{" "}
            {venue.location?.country || "Unknown country"}
          </p>
        </div>

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

        <div className="mt-6" style={{ height: "350px" }}>
          <h2 className="text-2xl font-bold">Check Availability</h2>
          <DatePicker
            inline
            monthsShown={2}
            highlightDates={highlightWithRanges}
            dayClassName={(date) => {
              return highlightWithRanges.some(
                (range) => date >= range.start && date <= range.end,
              )
                ? "react-datepicker__day--highlighted"
                : "";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
