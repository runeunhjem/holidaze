import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function PaginationButtons({ count, page, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        color="primary"
        onChange={onChange}
        showFirstButton={!isMobile} // Show these buttons only on non-mobile devices
        showLastButton={!isMobile} // Show these buttons only on non-mobile devices
        siblingCount={isMobile ? 0 : 2} // Fewer sibling buttons on mobile
        boundaryCount={isMobile ? 1 : 2} // Fewer boundary buttons on mobile
        sx={{ justifyContent: "center", paddingTop: 2 }}
      />
    </Stack>
  );
}

PaginationButtons.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

PaginationButtons.defaultProps = {
  count: 0,
};

export default PaginationButtons;
