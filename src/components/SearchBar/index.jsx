import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
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
    dateFrom: "",
    dateTo: "",
    guests: "",
  });
  const [lookaheadResults, setLookaheadResults] = useState([]);

  // Debounce function to delay fetchLookaheadResults
  const debounceFetchLookaheadResults = debounce(async (query) => {
    if (!query) {
      setLookaheadResults([]);
      return;
    }
    try {
      const response = await fetchApi(
        `${ENDPOINTS.venues}/search?q=${encodeURIComponent(query)}${PARAMS.sortBy}${PARAMS.sortOrder}`,
      );
      if (response && Array.isArray(response.data)) {
        setLookaheadResults(response.data);
      } else {
        setLookaheadResults([]);
      }
    } catch (error) {
      console.error("Error fetching lookahead results:", error);
      setLookaheadResults([]);
    }
  }, 700); // Adjust the delay as needed (300ms in this case)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    if (name === "destination") {
      debounceFetchLookaheadResults(value);
    }
  };

  const handleDateChange = (name, newValue) => {
    setSearchParams((prev) => ({ ...prev, [name]: newValue }));
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
      params.set("dateFrom", searchParams.dateFrom);
    }
    if (searchParams.dateTo) {
      params.set("dateTo", searchParams.dateTo);
    }
    navigate(`/searchResults?${params.toString()}`);
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
          onChange={handleInputChange}
          value={searchParams.guests}
        />
      </div>
      <BasicDatePickers
        dateFrom={searchParams.dateFrom}
        setDateFrom={(newValue) => handleDateChange("dateFrom", newValue)}
        dateTo={searchParams.dateTo}
        setDateTo={(newValue) => handleDateChange("dateTo", newValue)}
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
            <SearchVenueCard key={venue.id} venue={venue} />
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
