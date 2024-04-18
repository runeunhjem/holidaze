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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-0 py-4 max-w-1200 mx-auto z-1">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <DestinationInput
          className="w-full md:w-1/2"
          name="destination"
          label="Destination"
          onChange={(e) => handleChange(e)}
          value={searchParams.destination}
        />
        <GuestsInput
          className="w-full md:w-1/2"
          name="guests"
          label="Guests"
          onChange={(e) => handleChange(e)}
          value={searchParams.guests}
        />
      </div>

      <BasicDatePicker
        name="checkIn"
        label="Check-in"
        value={searchParams.checkIn}
        onChange={(newValue) => handleChange({ target: { name: "checkIn" } }, newValue)}
      />
      <CustomButton type="submit" sx={{ width: "200px" }} />

    </form>
  );
}

export default SearchBar;
