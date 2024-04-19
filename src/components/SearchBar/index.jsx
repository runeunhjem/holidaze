import propTypes from "prop-types";
import { useState } from "react";
import BasicDatePicker from "../MUI/BasicDatePicker";
import DestinationInput from "../MUI/DestinationInput";
import GuestsInput from "../MUI/GuestsInput";
import Stack from "@mui/material/Stack";
import Button from "../MUI/Button";
import CancelButton from "../MUI/CancelButton";

function SearchBar({ onClose }) {
  // Accepting onClose prop
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleChange = (e, newValue) => {
    const name = e.target.name || e.target.getAttribute("name");
    const value = newValue || e.target.value;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchParams);
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
      <BasicDatePicker
        name="checkIn"
        label="Check-in"
        value={searchParams.checkIn}
        onChange={(newValue) => handleChange({ target: { name: "checkIn" } }, newValue)}
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
