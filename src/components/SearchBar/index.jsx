import propTypes from "prop-types";
import { useState } from "react";
import BasicDatePickers from "../MUI/BasicDatePicker";
import DestinationInput from "../MUI/DestinationInput";
import GuestsInput from "../MUI/GuestsInput";
import Stack from "@mui/material/Stack";
import Button from "../MUI/Button";
import CancelButton from "../MUI/CancelButton";
// import { fetchApi } from "../../utils/fetchApi";

function SearchBar({ onClose }) {
  // const [dateFromDate, setdateFromDate] = useState(null);
  // const [dateToDate, setdateToDate] = useState(null);


  // Accepting onClose prop
  const [searchParams, setSearchParams] = useState({
    destination: "",
    dateFrom: "",
    dateTo: "",
    guests: "",
  });

  const handleChange = (event, newValue) => {
    const target = event.target;
    const name = target.name;
    const value = target.value || newValue; // This will use the target value or a passed newValue from components like date pickers

    console.log(`Input change detected. Field: ${name}, Value: ${value}`);

    setSearchParams((prevState) => {
      const updatedParams = { ...prevState, [name]: value };
      console.log(`Updated search params:`, updatedParams);
      return updatedParams;
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with search parameters:", searchParams); // Log current state at submission
    // if (!searchParams.destination || !searchParams.dateFrom || !searchParams.dateTo || !searchParams.guests) {
    //   console.error("All fields must be filled out");
    //   return;
    // }

    // const query = encodeURIComponent(searchParams.destination);
    // const maxGuests = encodeURIComponent(searchParams.guests);
    // const availableFrom = encodeURIComponent(searchParams.dateFrom);
    // const availableTo = encodeURIComponent(searchParams.dateTo);

    try {
      const url = `https://v2.api.noroff.dev/holidaze/venues/search?_owner=true&_bookings=true&q=a`;
      
      console.log("Fetching URL:", url); // Log the full URL being fetched
      const response = await fetch(url);
      const data = await response.json();
      console.log("Search results:", data); // Log the results from the API
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-0 py-4 max-w-1200 mx-auto z-1">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <DestinationInput
          className="w-full md:w-1/2"
          name="destination"
          label="Destination"
          onChange={handleChange}
          value={searchParams.destination}
        />
        <GuestsInput
          className="w-full md:w-1/2"
          name="guests"
          label="Guests"
          onChange={handleChange}
          value={searchParams.guests}
        />
      </div>
      <BasicDatePickers
        dateFrom={searchParams.dateFrom}
        setDateFrom={(newValue) => setSearchParams((prev) => ({ ...prev, dateFrom: newValue }))}
        dateTo={searchParams.dateTo}
        setDateTo={(newValue) => setSearchParams((prev) => ({ ...prev, dateTo: newValue }))}
      />
      <Stack
        spacing={2}
        direction="row"
        sx={{
          width: "100%",
          height: "40px",
          justifyContent: "center",
        }}>
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
