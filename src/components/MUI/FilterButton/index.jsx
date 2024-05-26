import PropTypes from "prop-types";
import useStore from "../../../hooks/useStore";
import { ButtonContainer, FilterButtonStyled } from "./index.styled";
import Options from "../../Options";
import Filters from "../../Filters";
import { useEffect } from "react";

function FilterButton() {
  const {
    optionsMenuIsOpen,
    filtersMenuIsOpen,
    toggleOptionsOpen,
    toggleFiltersOpen,
    countActiveOptions,
    countActiveFilters,
  } = useStore();

  const activeOptionsCount = countActiveOptions();
  const activeFiltersCount = countActiveFilters();

  // Close both options and filters when certain conditions are met or on page reload
  useEffect(() => {
    // Example to auto-close, adjust logic as needed
    toggleOptionsOpen();
    toggleFiltersOpen();
  }, [toggleOptionsOpen, toggleFiltersOpen]);

  return (
    <ButtonContainer>
      <FilterButtonStyled
        onClick={toggleFiltersOpen}
        activeCount={activeFiltersCount}
        style={{
          backgroundColor: activeFiltersCount > 0 ? "green" : undefined,
          color: activeFiltersCount > 0 ? "white" : undefined,
        }}
      >
        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </FilterButtonStyled>
      <FilterButtonStyled
        onClick={toggleOptionsOpen}
        activeCount={activeOptionsCount}
        style={{
          backgroundColor: activeOptionsCount > 0 ? "green" : undefined,
          color: activeOptionsCount > 0 ? "white" : undefined,
        }}
      >
        Options {activeOptionsCount > 0 && `(${activeOptionsCount})`}
      </FilterButtonStyled>

      <Options
        optionsMenuIsOpen={optionsMenuIsOpen}
        onClose={toggleOptionsOpen}
      />
      <Filters open={filtersMenuIsOpen} onClose={toggleFiltersOpen} />
    </ButtonContainer>
  );
}

FilterButton.defaultProps = {
  continents: [],
  countries: [],
};

FilterButton.propTypes = {
  continents: PropTypes.arrayOf(PropTypes.string).isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterButton;
