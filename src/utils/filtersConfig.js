// This could be part of your store or a separate utility file
const filterConfigs = {
  rating: {
    label: "Minimum Rating",
    options: [1, 2, 3, 4, 5],
    renderOptionLabel: (value) => `${value} Stars`,
  },
  maxPrice: {
    label: "Max Price",
    options: Array.from({ length: 500 }, (_, i) => i * 10 + 50),
    renderOptionLabel: (value) => `$${value}`,
  },
  minPrice: {
    label: "Min Price",
    options: Array.from({ length: 200 }, (_, i) => i * 10),
    renderOptionLabel: (value) => `$${value}`,
  },
  city: {
    label: "City",
    options: ["City 1", "City 2", "City 3"], // Should dynamically generate based on available data
    renderOptionLabel: (value) => value,
  },
  country: {
    label: "Country",
    options: ["Country 1", "Country 2", "Country 3"], // Should dynamically generate based on available data
    renderOptionLabel: (value) => value,
  },
  continent: {
    label: "Continent",
    options: [
      "Africa",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ],
    renderOptionLabel: (value) => value,
  },
  maxGuests: {
    label: "Max Guests",
    options: [1, 2, 4, 6, 8, 10],
    renderOptionLabel: (value) => `${value} Guests`,
  },
  amenities: {
    label: "Amenities",
    options: ["Wi-Fi", "Parking", "Breakfast", "Pets Allowed"],
    renderOptionLabel: (value) => value,
    isMultiple: true, // If multiple selection is allowed
  },
  manager: {
    label: "Venue Manager",
    options: ["Manager 1", "Manager 2", "Manager 3"], // Should dynamically generate based on available data
    renderOptionLabel: (value) => value,
  },
  hasBookings: {
    label: "Has Bookings",
    options: [true, false],
    renderOptionLabel: (value) => (value ? "Yes" : "No"),
  },
};
export default filterConfigs;