import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { subDays, addDays } from "date-fns";
import "./index.css";

function VenueDetailsPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  // console.log("venue", venue);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      const { data, error } = await getVenueById(id);
      if (error) {
        console.error("Failed to fetch venue details:", error);
      } else {
        setVenue(data);
      }
    };

    fetchVenueDetails();
  }, [id]);

  useEffect(() => {
    // Only attempt to set the title if venue is not null
    if (venue) {
      document.title = `${venue.name} - Venue Details`;
    }
  }, [venue]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  // Format the created date to a more readable format
  const formattedCreatedDate = new Date(venue.created).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const formattedUpdatedDate = new Date(venue.updated).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const images = venue.media.map((url) => ({
    url,
    alt: `Illustration of ${venue.name}`,
  }));

  // Convert booking dates to a readable format
  const formattedBookings = venue.bookings.map((booking) => {
    const dateFrom = new Date(booking.dateFrom).toLocaleDateString();
    const dateTo = new Date(booking.dateTo).toLocaleDateString();
    return `${dateFrom} to ${dateTo}`;
  });

  // Prepare booked dates for highlighting
  const highlightWithRanges = venue.bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
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
        <p>
          <strong>Venue added:</strong> {formattedCreatedDate} by {venue.owner.name}
        </p>
        <p>
          <strong>Venue updated:</strong> {formattedUpdatedDate} by {venue.owner.name}
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
        {/* Display bookings */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Booked Dates</h2>
          <ul>
            {formattedBookings.length > 0 ? (
              formattedBookings.map((booking, index) => <li key={index}>{booking}</li>)
            ) : (
              <li>No bookings yet.</li>
            )}
          </ul>
        </div>
        {/* Date Picker with highlighted dates */}
        <div className="mt-6" style={{ height: "350px" }}>
          <h2 className="text-2xl font-bold">Check Availability</h2>
          <DatePicker
            inline
            monthsShown={2}
            highlightDates={highlightWithRanges}
            // Custom day className to handle highlighting
            dayClassName={(date) => {
              let highlight = false;
              for (const range of highlightWithRanges) {
                if (date >= range.start && date <= range.end) {
                  highlight = true;
                }
              }
              return highlight ? "react-datepicker__day--highlighted" : "";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
