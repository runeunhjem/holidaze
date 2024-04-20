// import PropTypes from "prop-types"; // Import PropTypes
import { FilterButtonStyled } from "./index.styled";
import { OptionsButtonStyled } from "./index.styled";

function FilterButton() {
  return (
    // <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
    <div>
      <FilterButtonStyled> Filters </FilterButtonStyled>
      <OptionsButtonStyled>Options</OptionsButtonStyled>
    </div>
  );
}

export default FilterButton;
