import { useState } from "react";

function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the API call with the searchParams state
    console.log(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={searchParams.destination}
        onChange={handleChange}
        className="input" // Tailwind CSS class for styling
      />
      <input
        type="date"
        name="checkIn"
        placeholder="Check-in"
        value={searchParams.checkIn}
        onChange={handleChange}
        className="input"
      />
      <input
        type="date"
        name="checkOut"
        placeholder="Check-out"
        value={searchParams.checkOut}
        onChange={handleChange}
        className="input"
      />
      <input
        type="number"
        name="guests"
        placeholder="Guests"
        value={searchParams.guests}
        onChange={handleChange}
        className="input"
      />
      <button type="submit" className="btn">
        Search
      </button>{" "}
      {/* Tailwind CSS for button */}
    </form>
  );
}

export default SearchBar;
