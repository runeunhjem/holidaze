import PropTypes from "prop-types"; // Import PropTypes
import { SingleButtonStyle } from "./index.styled";

function SingleButton({ children, ...props }) {
  return <SingleButtonStyle {...props}>{children}</SingleButtonStyle>;
}

// Define prop types for SingleButton component
SingleButton.propTypes = {
  children: PropTypes.node.isRequired, // Define children as a required prop
};

export default SingleButton;
