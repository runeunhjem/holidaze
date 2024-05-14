import propTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicDatePickers from "../MUI/BasicDatePicker";
import DestinationInput from "../MUI/DestinationInput";
import GuestsInput from "../MUI/GuestsInput";
import Stack from "@mui/material/Stack";
import Button from "../MUI/Button";
import CancelButton from "../MUI/CancelButton";

function SearchBar({ onClose }) {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    destination: "",
    dateFrom: "",
    dateTo: "",
    guests: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setSearchParams((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Only add parameters that have values
    if (searchParams.destination) {
      params.set("city", searchParams.destination);
      params.set("country", searchParams.destination);
      params.set("continent", searchParams.destination);
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
    console.log("Navigating to: ", `/searchResults?${params.toString()}`);
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
    </form>
  );
}

SearchBar.propTypes = {
  onClose: propTypes.func.isRequired,
};

export default SearchBar;
