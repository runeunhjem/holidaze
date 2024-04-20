// import PropTypes from "prop-types"; // Import PropTypes
import { ButtonContainer, FilterButtonStyled } from "./index.styled";

// import { OptionsButtonStyled } from "./index.styled";

function FilterButton() {
  return (
    <ButtonContainer>
      <FilterButtonStyled> Filters </FilterButtonStyled>
      <FilterButtonStyled>Options</FilterButtonStyled>
    </ButtonContainer>
  );
}

export default FilterButton;
