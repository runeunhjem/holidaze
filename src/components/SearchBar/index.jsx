import PropTypes from "prop-types";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../../constants/api";
import BasicDatePickers from "../MUI/BasicDatePicker";
import DestinationInput from "../MUI/DestinationInput";
import GuestsInput from "../MUI/GuestsInput";
import Stack from "@mui/material/Stack";
import Button from "../MUI/Button";
import CancelButton from "../MUI/CancelButton";
import SearchVenueCard from "../SearchVenueCard";
import "../SearchVenueCard/index.css";

function SearchBar({ onClose }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: "",
    dateFrom: null,
    dateTo: null,
    guests: "",
  });
  const [lookaheadResults, setLookaheadResults] = useState([]);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);
  const debouncedFetchRef = useRef();

  const isRangeBooked = useCallback((venue, start, end) => {
    return venue.bookings?.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return (
        (start <= fromDate && end >= fromDate) ||
        (start >= fromDate && start <= toDate) ||
        (start <= fromDate && end >= toDate)
      );
    });
  }, []);

  useEffect(() => {
    debouncedFetchRef.current = debounce(async (latestSearchParams) => {
      const { destination, dateFrom, dateTo, guests } = latestSearchParams;

      if (!destination) {
        setLookaheadResults([]);
        return;
      }
      try {
        const response = await fetchApi(
          `${ENDPOINTS.venues}/search?q=${encodeURIComponent(destination)}${PARAMS.sortBy}${PARAMS.sortOrder}${PARAMS._bookings}`,
        );
        if (response && Array.isArray(response.data)) {
          let filteredResults = response.data;

          if (dateFrom && dateTo) {
            const start = new Date(dateFrom);
            const end = new Date(dateTo);
            filteredResults = filteredResults.filter(
              (venue) => !isRangeBooked(venue, start, end),
            );
          }

          if (guests) {
            filteredResults = filteredResults.filter(
              (venue) => venue.maxGuests >= guests,
            );
          }

          setLookaheadResults(filteredResults);
        } else {
          setLookaheadResults([]);
        }
      } catch (error) {
        console.error("Error fetching lookahead results:", error);
        setLookaheadResults([]);
      }
    }, 700); // Adjust the delay as needed (700ms in this case)

    return () => {
      debouncedFetchRef.current.cancel();
    };
  }, [isRangeBooked]);

  useEffect(() => {
    debouncedFetchRef.current(searchParams);
  }, [searchParams]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    console.log(`Input ${name} changed:`, value);
  };

  const handleDateChange = (name, newValue) => {
    setSearchParams((prev) => ({ ...prev, [name]: newValue }));
    console.log(`Date ${name} changed:`, newValue);
  };

  const handleDatepickerClose = () => {
    setIsDatepickerOpen(false);
    console.log("Datepicker open status:", isDatepickerOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.destination) {
      params.set("q", searchParams.destination);
    }
    if (searchParams.guests) {
      params.set("guests", searchParams.guests);
    }
    if (searchParams.dateFrom) {
      params.set("dateFrom", searchParams.dateFrom.toISOString());
    }
    if (searchParams.dateTo) {
      params.set("dateTo", searchParams.dateTo.toISOString());
    }
    navigate(`/searchResults?${params.toString()}`);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="z-1 mx-auto flex max-w-1200 flex-col gap-4 px-0 py-4"
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <DestinationInput
          className="w-full md:w-1/2"
          name="destination"
          label="Destination"
          onChange={handleInputChange}
          value={searchParams.destination}
        />
        <GuestsInput
          className="w-full md:w-1/2"
          name="guests"
          label="Guests"
          value={searchParams.guests}
          onChange={handleInputChange}
        />
      </div>
      <BasicDatePickers
        dateFrom={searchParams.dateFrom}
        setDateFrom={(newValue) => handleDateChange("dateFrom", newValue)}
        dateTo={searchParams.dateTo}
        setDateTo={(newValue) => handleDateChange("dateTo", newValue)}
        onCloseDatepicker={handleDatepickerClose}
      />
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: "100%", height: "40px", justifyContent: "center" }}
      >
        <Button type="submit">Search</Button>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </Stack>
      {/* Lookahead Results */}
      {lookaheadResults.length > 0 && (
        <div className="lookahead-results">
          {lookaheadResults.map((venue) => (
            <SearchVenueCard key={venue.id} venue={venue} onClose={onClose} />
          ))}
        </div>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchBar;
