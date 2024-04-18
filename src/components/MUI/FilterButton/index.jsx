// import PropTypes from "prop-types"; // Import PropTypes
import { FilterButtonStyled } from "./index.styled";

function FilterButton({  ...props }) {
  return <FilterButtonStyled { ...props }>
    Filters
    {/* { children } */}

  </FilterButtonStyled>;
}

// Define prop types for FilterButton component
// FilterButton.propTypes = {
//   children: PropTypes.node.isRequired, // Define children as a required prop
// };

export default FilterButton;
