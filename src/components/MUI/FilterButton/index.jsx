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
  } = useStore();

  // Close both options and filters when certain conditions are met or on page reload
  useEffect(() => {
    // Example to auto-close, adjust logic as needed
    toggleOptionsOpen();
    toggleFiltersOpen();
  }, [toggleOptionsOpen, toggleFiltersOpen]);

  return (
    <ButtonContainer>
      <FilterButtonStyled onClick={toggleFiltersOpen}>
        Filters
      </FilterButtonStyled>
      <FilterButtonStyled onClick={toggleOptionsOpen}>
        Options
      </FilterButtonStyled>

      <Options
        optionsMenuIsOpen={optionsMenuIsOpen}
        onClose={toggleOptionsOpen}
      />
      <Filters
        open={filtersMenuIsOpen}
        onClose={toggleFiltersOpen}
        // continents={continents}
        // countries={countries}
      />
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
