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
    updateFilterOptions(); // Populate filter options when the component mounts
  }, [updateFilterOptions]);

  const handleFiltersChange = (field, multiple) => (event) => {
    setFilter(field, multiple ? event.target.value : event.target.value);
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
      <Typography variant="h6" gutterBottom>
        Filter Venues
      </Typography>
      {Object.entries(filterOptions).map(([key, options]) => (
        <FormControl fullWidth margin="normal" key={key}>
          <InputLabel>{`Filter by ${key}`}</InputLabel>
          <Select
            value={filters[key] || (key === "amenities" ? [] : "")}
            label={`Filter by ${key}`}
            onChange={handleFiltersChange(key, key === "amenities")}
            multiple={key === "amenities"}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
      <Button
        onClick={() => setFilter("resetFilters", true)}
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
      >
        Reset Filters
      </Button>
      <Button
        onClick={toggleFiltersOpen}
        sx={{
          mt: 4,
          bgcolor: "var(--button-bg-color-cancel)",
          color: "var(--button-text-color-cancel)",
          "&:hover": { backgroundColor: "var(--button-bg-color-hover-cancel)" },
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default Filters;
