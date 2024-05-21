import { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import useStore from "../../hooks/useStore";
import { BiFilterAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import AddMissingFormLabelsToMUI from "../../utils/addMissingFormLabelsToMUI";

const Filters = () => {
  const {
    filters,
    setFilter,
    toggleFiltersOpen,
    filtersMenuIsOpen,
    filterOptions,
    updateFilterOptions,
  } = useStore();

  useEffect(() => {
    updateFilterOptions(); // Ensure options are updated on component mount
  }, [updateFilterOptions]);

  const handleFiltersChange = (field, isMultiple) => (event) => {
    const value = isMultiple ? event.target.value : event.target.value;
    setFilter(field, value);
  };

  const labelMap = {
    rating: "Rating",
    maxPrice: "Max Price",
    minPrice: "Min Price",
    city: "City",
    country: "Country",
    continent: "Continent",
    maxGuests: "Max Guests",
    amenities: "Amenities",
    manager: "Manager",
    hasBookings: "Has Bookings",
  };

  const sortOptions = (options) => {
    if (options.every((option) => typeof option === "number")) {
      // Sort numerical options from low to high
      return options.sort((a, b) => a - b);
    } else if (options.every((option) => typeof option === "string")) {
      // Sort string options alphabetically
      return options.sort((a, b) => a.localeCompare(b));
    }
    return options;
  };

  return (
    <Box
      className="custom-scrollbar"
      sx={{
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: "translate(-50%, 100%)",
        width: "90vw",
        maxWidth: "618px",
        maxHeight: "60vh",
        overflowY: "auto",
        bgcolor: "var(--header-bg-color)",
        boxShadow: 24,
        outline: "1px solid var(--border-color)",
        borderRadius: "20px",
        p: { xs: 2, sm: 4 },
        zIndex: 1300,
        transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
        minWidth: { xs: "250px", sm: "600px" },
        opacity: filtersMenuIsOpen ? 1 : 0,
        visibility: filtersMenuIsOpen ? "visible" : "hidden",
      }}
    >
      <AddMissingFormLabelsToMUI />{" "}
      <MdClose
        onClick={toggleFiltersOpen}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          cursor: "pointer",
          color: "gray",
          fontSize: "24px",
        }}
      />
      <Typography className="flex items-center" variant="h5" gutterBottom>
        <BiFilterAlt
          className="me-4 text-3xl"
          style={{
            color: "var(--link-color)",
          }}
        />
        Filter Venues
      </Typography>
      {Object.entries(filterOptions).map(([key, options]) => (
        <FormControl fullWidth margin="normal" key={key}>
          <InputLabel>{labelMap[key] || `Filter by ${key}`}</InputLabel>
          <Select
            className="custom-select"
            value={filters[key] || (key === "amenities" ? [] : "")}
            label={labelMap[key] || `Filter by ${key}`}
            onChange={handleFiltersChange(key, key === "amenities")}
            multiple={key === "amenities"}
          >
            {sortOptions(options).map((option, index) => (
              <MenuItem key={index} value={option}>
                {option != null ? option.toString() : "N/A"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
          width: "100%",
        }}
      >
        <Button
          onClick={toggleFiltersOpen}
          sx={{
            bgcolor: "var(--button-bg-color-cancel)",
            color: "var(--button-text-color-cancel)",
            "&:hover": {
              backgroundColor: "var(--button-bg-color-hover-cancel)",
            },
          }}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            setFilter("resetFilters", true);
            useStore.getState().resetFilters(); // Resets filters and then triggers re-fetch
          }}
          variant="outlined"
          sx={{
            bgcolor: "var(--button-bg-color)",
            color: "var(--button-text-color)",
            border: "0px solid var(--border-color)",
            "&:hover": {
              backgroundColor: "var(--button-bg-color-hover)",
              color: "var(--button-text-color-hover)",
              outline: "1px solid var(--border-color)",
              border: "0px solid var(--border-color)",
            },
          }}
        >
          Reset Filters
        </Button>
      </div>
    </Box>
  );
};

export default Filters;
