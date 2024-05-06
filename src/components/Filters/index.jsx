import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const Filters = ({
  open,
  onClose,
  filters,
  onFiltersChange,
  continents = [],
  countries = [],
}) => {
  const handleFilterChange = (field, value) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <Box
      className="custom-scrollbar"
      id="filters"
      sx={{
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: open ? "translate(-50%, -100%)" : "translate(-50%, 100%)",
        width: "90vw",
        maxWidth: "600px",
        maxHeight: "60vh",
        overflowY: "auto",
        bgcolor: "var(--header-bg-color)",
        boxShadow: 24,
        outline: "1px solid var(--border-color)",
        borderRadius: "20px !important",
        p: { xs: 2, sm: 4 },
        zIndex: 1300,
        transition: "transform 0.3s ease-in-out",
        minWidth: { xs: "250px", sm: "600px" },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "var(--header-bg-color)",
                padding: "0 4px",
              }}
            >
              Rating
            </InputLabel>
            <Select
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "var(--header-bg-color)",
                padding: "0 4px",
              }}
            >
              Price Range
            </InputLabel>
            <Select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            >
              <MenuItem value="Choose Pricerange">Choose Pricerange</MenuItem>
              <MenuItem value="under500">Under 500</MenuItem>
              <MenuItem value="500to1000">500 - 1000</MenuItem>
              <MenuItem value="over1000">Over 1000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "var(--header-bg-color)",
                padding: "0 4px",
              }}
            >
              Continent
            </InputLabel>
            <Select
              value={filters.continent}
              onChange={(e) => handleFilterChange("continent", e.target.value)}
            >
              {continents.length > 0 ? (
                continents.map((continent) => (
                  <MenuItem key={continent} value={continent}>
                    {continent}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No continents available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "var(--header-bg-color)",
                padding: "0 4px",
              }}
            >
              Country
            </InputLabel>
            <Select
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              {countries.length > 0 ? (
                countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No countries available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                backgroundColor: "var(--header-bg-color)",
                padding: "0 4px",
              }}
            >
              Max Guests
            </InputLabel>
            <Select
              value={filters.maxGuests}
              onChange={(e) => handleFilterChange("maxGuests", e.target.value)}
            >
              <MenuItem value="">Choose Max Guests</MenuItem>
              {[1, 2, 4, 6, 8, 10, 12, 15, 20].map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          onClick={onClose}
          sx={ {
            width: "100%",
            bgcolor: "var(--button-bg-color-cancel)",
            color: "var(--button-text-color-cancel)",
            "&:hover": {
              backgroundColor: "var(--button-bg-color-hover-cancel)",
              color: "var(--button-text-color-cancel)",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

Filters.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  continents: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
};

export default Filters;
