import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import { getVenueById } from "../../utils/getVenueById";
import { MdFastfood, MdLocationPin, MdPets } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { FiWifi } from "react-icons/fi";
import { TbParking } from "react-icons/tb";
import { sanitizeFields } from "../../utils/options";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

function VenueDetailsPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  const isDateBooked = (date) => {
    return venue.bookings.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return date >= fromDate && date <= toDate;
    });
  };

  const isRangeBooked = (start, end) => {
    return venue.bookings.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return (
        (start <= fromDate && end >= fromDate) || // starts before and ends during/after
        (start >= fromDate && start <= toDate) || // starts during
        (start <= fromDate && end >= toDate) // encompasses booking
      );
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (isRangeBooked(start, end)) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  const renderDayContents = (day, date) => {
    if (isDateBooked(date)) {
      return <span className="booked-date">{day}</span>;
    }
    return day;
  };

  return (
    <div className="venue-details mx-auto max-w-4xl p-4">
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
            <p className="font-bold underline underline-offset-4">Details:</p>
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

        <div className="details-container">
          <div className="booking-left">
            <p className="font-bold underline underline-offset-4 booking-title">Book Now:</p>
            <div className="datepicker-container">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                filterDate={(date) => !isDateBooked(date)}
                monthsShown={windowWidth >= 768 ? 2 : 1}
                // orientation="landscape"
                renderDayContents={renderDayContents}
              />
            </div>
          </div>
          {venue.bookings && venue.bookings.length > 0 && (
            <div className="booking-right">
              <p className="font-bold underline underline-offset-4 booking-title">
                Booked Dates
              </p>
              <ul className="amenities-list">
                {venue.bookings.map((booking, index) => (
                  <li key={index}>
                    {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
