import PropTypes from "prop-types";
import useStore from "../../../hooks/useStore";
import { ButtonContainer, FilterButtonStyled } from "./index.styled";
import Options from "../../Options";
import Filters from "../../Filters";
import { useEffect, useState } from "react";

function FilterButton({
  continents = [],
  countries = [],
  onOptionsChange = () => {},
  onFiltersChange = () => {},
}) {
  const {
    isOptionsOpen,
    isFiltersOpen,
    toggleOptionsOpen,
    toggleFiltersOpen,
    closeAll,
  } = useStore();

  const [options, setOptions] = useState({
    hideWithoutImages: false,
    venuesPerPage: 10,
    hasFreeParking: false,
    hasFreeWifi: false,
    hasBreakfast: false,
    allowsPets: false,
  });

  const [filters, setFilters] = useState({
    rating: "",
    priceRange: "under500",
    continent: "",
    country: "",
    maxGuests: 1,
  });

  const handleOptionsChange = (newOptions) => {
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Close both options and filters when the page reloads
  useEffect(() => {
    toggleOptionsOpen();
    toggleFiltersOpen();
    closeAll();
  }, [closeAll, toggleOptionsOpen, toggleFiltersOpen]);

  return (
    <ButtonContainer>
      <FilterButtonStyled onClick={toggleFiltersOpen}>
        Filters
      </FilterButtonStyled>
      <FilterButtonStyled onClick={toggleOptionsOpen}>
        Options
      </FilterButtonStyled>

      <Options
        open={isOptionsOpen}
        onClose={toggleOptionsOpen}
        options={options}
        onOptionsChange={handleOptionsChange}
      />

      <Filters
        open={isFiltersOpen}
        onClose={toggleFiltersOpen}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        continents={continents}
        countries={countries}
      />
    </ButtonContainer>
  );
}

FilterButton.defaultProps = {
  continents: [],
  countries: [],
  onOptionsChange: () => {},
  onFiltersChange: () => {},
};

FilterButton.propTypes = {
  continents: PropTypes.arrayOf(PropTypes.string).isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionsChange: PropTypes.func.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};

export default FilterButton;
