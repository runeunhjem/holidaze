// import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // Button,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Filters = (
  // {
  // open,
  // onClose,
  // onFiltersChange,
  // continents = [],
  // countries = [],
  // venues,
  // }
) => {
  const [filters, setFilters] = useState({
    rating: "",
    priceRange: "",
    continent: "",
    country: "",
    maxGuests: "",
  });

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    // onFiltersChange(updatedFilters);
  };

  // const applyFilters = () => {
  //   if (!venues) return; // Ensure venues is not undefined

  //   let filteredVenues = venues.filter((venue) => {
  //     return (
  //       (!filters.rating || venue.rating >= Number(filters.rating)) &&
  //       (!filters.priceRange ||
  //         (filters.priceRange === "under500"
  //           ? venue.price < 500
  //           : filters.priceRange === "500to1000"
  //             ? venue.price >= 500 && venue.price <= 1000
  //             : venue.price > 1000)) &&
  //       (!filters.continent ||
  //         venue.location.continent === filters.continent) &&
  //       (!filters.country || venue.location.country === filters.country) &&
  //       (!filters.maxGuests || venue.maxGuests >= Number(filters.maxGuests))
  //     );
  //   });

  //   onFiltersChange({ ...filters, filteredVenues });
  // };

  return (
    <Box
      className="custom-scrollbar"
      id="filters"
      sx={{
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: "translate(-50%, 100%)",
        width: "90vw",
        maxWidth: "600px",
        maxHeight: "60vh",
        overflowY: "auto",
        bgcolor: "var(--header-bg-color)",
        boxShadow: 24,
        outline: "1px solid var(--border-color)",
        borderRadius: "20px",
        p: { xs: 2, sm: 4 },
        zIndex: 1300,
        opacity: open ? 0 : 0, // Set to 1 : 0 when i have fixed the issue
        visibility: open ? "hidden" : "hidden", // Set to visible : hidden when i have fixed the issue
        transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
        minWidth: { xs: "250px", sm: "600px" },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Grid container spacing={2}>
        {[
          { label: "Min. Rating", field: "rating", options: [1, 2, 3, 4, 5] },
          {
            label: "Price Range",
            field: "priceRange",
            options: ["Choose Pricerange", "under500", "500to1000", "over1000"],
          },
          // {
          //   label: "Continent",
          //   field: "continent",
          //   options:
          //     continents.length > 0 ? continents : ["No continents available"],
          // },
          // {
          //   label: "Country",
          //   field: "country",
          //   options:
          //     countries.length > 0 ? countries : ["No countries available"],
          // },
          {
            label: "Max Guests",
            field: "maxGuests",
            options: [1, 2, 4, 6, 8, 10, 12, 15, 20],
          },
        ].map((filter) => (
          <Grid item xs={12} sm={6} key={filter.field}>
            <FormControl fullWidth>
              <InputLabel>{filter.label}</InputLabel>
              <Select
                value={filters[filter.field]}
                onChange={(e) =>
                  handleFilterChange(filter.field, e.target.value)
                }
              >
                {filter.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {typeof option === "string" ? option : `${option}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={2}>
        {/* <Button onClick={applyFilters}>Apply Filters</Button>
        <Button onClick={onClose}>Close</Button> */}
      </Box>
    </Box>
  );
};

// Filters.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onFiltersChange: PropTypes.func.isRequired,
//   continents: PropTypes.array.isRequired,
//   countries: PropTypes.array.isRequired,
//   venues: PropTypes.array.isRequired,
// };

export default Filters;
