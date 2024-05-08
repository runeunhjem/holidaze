import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { MdFastfood, MdLocationPin, MdPets } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { FiWifi } from "react-icons/fi";
import { TbParking } from "react-icons/tb";

function VenueDetailsPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      const { data, error } = await getVenueById(id);
      if (error) {
        console.error("Failed to fetch venue details:", error);
      } else if (data && data.data) {
        setVenue(data.data);
      }
    };

    fetchVenueDetails();
  }, [id]);

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
        media={venue.media || []}
        countryName={venue.location.country || "Unspecified"}
        continent={venue.location.continent || "Unspecified"}
        venue={venue}
      />

      <div className="mt-6 space-y-2">
        <div className="mb-3 flex align-middle">
          <MdLocationPin className="mr-2 text-2xl text-red-500" />
          <p className="font-bold tracking-wide">
            {venue.location.address}, {venue.location.city || "Unknown city"},
            {venue.location.zip}, {venue.location.country || "Unknown country"}
          </p>
        </div>
        <hr />
        <p className="py-3 tracking-wider">
          {venue.description || "No description provided."}
        </p>
        <p>
          <strong>Price:</strong> ${venue.price || "N/A"} / night
        </p>
        <p>
          <strong>Max Guests:</strong> {venue.maxGuests || "N/A"}
        </p>
        <p className="flex h-10 align-top">
          <strong>Rating:</strong>{" "}
          <RiStarSFill className="text-xl inline mt-0.3 text-yellow-500" />
          {venue.rating || "No rating"} stars
        </p>
        {venue.meta && (
          <div>
            <p className="mb-1 mt-5 font-bold">Amenities:</p>
            <ul>
              {venue.meta.wifi && (
                <li className="mb-1 flex">
                  <FiWifi className="me-3 text-xl" />
                  Free Wi-Fi
                </li>
              )}
              {venue.meta.parking && (
                <li className="mb-1 flex">
                  <TbParking className="me-3 text-xl" />
                  Free Parking
                </li>
              )}
              {venue.meta.breakfast && (
                <li className="mb-1 flex">
                  <MdFastfood className="me-3 text-xl" />
                  Breakfast included
                </li>
              )}
              {venue.meta.pets && (
                <li className="mb-1 flex">
                  <MdPets className="me-3 text-xl" />
                  Pets Allowed
                </li>
              )}
            </ul>
          </div>
        )}
        <DatePickerSection
          venue={venue}
          highlightWithRanges={highlightWithRanges}
        />
        {venue.bookings && venue.bookings.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Booked Dates</h2>
            <ul>
              {venue.bookings.map((booking, index) => (
                <li key={index}>
                  {new Date(booking.dateFrom).toLocaleDateString()} to
                  {new Date(booking.dateTo).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="pt-3">
          <strong>Venue added:</strong>{" "}
          {new Date(venue.created).toLocaleDateString()} by
          <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}>
            {" "}
            {venue.owner.name}
          </Link>
        </p>
        <p>
          <strong>Venue updated:</strong>{" "}
          {new Date(venue.updated).toLocaleDateString()} by
          <Link to={`/profile/${encodeURIComponent(venue.owner.name)}`}>
            {" "}
            {venue.owner.name}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VenueDetailsPage;

function DatePickerSection({ venue, highlightWithRanges }) {
  if (!venue || !highlightWithRanges) return null;
  return (
    <div className="pt-6" style={{ height: "350px" }}>
      <h2 className="text-2xl font-bold">Check Availability</h2>
      <DatePicker
        inline
        monthsShown={2}
        highlightDates={highlightWithRanges}
        dayClassName={(date) => {
          const isBooked = highlightWithRanges.some(
            (range) => date >= range.start && date <= range.end,
          );
          return isBooked ? "booked-date" : "available-date";
        }}
      />
    </div>
  );
}

DatePickerSection.propTypes = {
  venue: PropTypes.object.isRequired,
  highlightWithRanges: PropTypes.array.isRequired,
};