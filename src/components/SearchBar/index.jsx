import { useState } from "react";
import BasicDatePicker from "../MUI/BasicDatePicker";
import DestinationInput from "../MUI/DestinationInput";
// import ButtonWithSvg from "../MUI/ButtonWithSvg";
import GuestsInput from "../MUI/GuestsInput";
import CustomButton from "../MUI/Button";

function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  // This function is intended to handle changes for all inputs
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <DestinationInput
        name="destination"
        label="Destination"
        onChange={(e) => handleChange(e)}
        value={searchParams.destination}
      />
      <BasicDatePicker
        name="checkIn"
        label="Check-in"
        value={searchParams.checkIn}
        onChange={(newValue) => handleChange({ target: { name: "checkIn" } }, newValue)}
      />

      <GuestsInput name="guests" label="Guests" onChange={(e) => handleChange(e)} value={searchParams.guests} />
      <CustomButton type="submit" />
    </form>
  );
}

export default SearchBar;
