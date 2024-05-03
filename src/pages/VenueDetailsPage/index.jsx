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
      document.title = `${venue.name} - Venue Details`;
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.getElementsByTagName("head")[0].appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        "content",
        `${venue.name} offers a unique experience with its amenities. Located in ${venue.location.city}, it provides a perfect getaway with a rating of ${venue.rating}.`
      );
    }
  }, [venue]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }
  // console.log("venue", venue);
  // console.log("venue.media", venue.media);
  // const media =
  //   venue.media.length >= 0
  //     ? venue.media.map((media) => ({
  //         original: media.url,
  //         thumbnail: media.url,
  //         description: media.alt || `Illustration of ${venue.name}`,
  //       }))
  //     : [
  //         {
  //           original: venue.media.url,
  //           thumbnail: venue.media.url,
  //           description: venue.media.alt || `Illustration of ${venue.name}`,
  //         },
  //       ];

  const highlightWithRanges = venue.bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));
  console.log("Venue Data:", venue);


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{venue.name}</h1>
      <ImageGallery media={venue.media} countryName={venue.location.country} continent={venue.location.continent} venue={venue} />
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
        <p>
          <strong>Venue added:</strong> {new Date(venue.created).toLocaleDateString()} by
          <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}> {venue.owner.name}</Link>
        </p>
        <p>
          <strong>Venue updated:</strong> {new Date(venue.updated).toLocaleDateString()} by
          <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}> {venue.owner.name}</Link>
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
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Booked Dates</h2>
          <ul>
            {venue.bookings.map((booking, index) => (
              <li key={index}>
                {new Date(booking.dateFrom).toLocaleDateString()} to {new Date(booking.dateTo).toLocaleDateString()}
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
              return highlightWithRanges.some((range) => date >= range.start && date <= range.end)
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
