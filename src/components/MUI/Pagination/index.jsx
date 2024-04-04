import propTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationButtons({ count, page, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        color="primary"
        onChange={onChange}
        showFirstButton
        showLastButton
        sx={{ justifyContent: "center", paddingTop: 2 }}
      />
    </Stack>
  );
}

PaginationButtons.propTypes = {
  count: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default PaginationButtons;