import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import useStore from "../../hooks/useStore";
import { MdClose } from "react-icons/md";

const Options = () => {
  const {
    options,
    setOptions,
    venuesPerPage,
    setVenuesPerPage,
    toggleOptionsOpen,
    optionsMenuIsOpen,
  } = useStore();

  const handleOptionChange = (field, event) => {
    setOptions({ ...options, [field]: event.target.checked });
  };

  const handleVenuesPerPageChange = (event) => {
    setVenuesPerPage(event.target.value);
  };

  return (
    <Box
      className="custom-scrollbar"
      sx={{
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: "translate(-50%, 100%)",
        width: "90vw",
        maxWidth: "618px",
        maxHeight: "60vh",
        overflowY: "auto",
        bgcolor: "var(--header-bg-color)",
        boxShadow: 24,
        outline: "1px solid var(--border-color)",
        borderRadius: "20px",
        p: { xs: 2, sm: 4 },
        zIndex: 1300,
        transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
        minWidth: { xs: "250px", sm: "600px" },
        opacity: optionsMenuIsOpen ? 1 : 0,
        visibility: optionsMenuIsOpen ? "visible" : "hidden",
      }}
    >
      <MdClose
        onClick={toggleOptionsOpen}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          cursor: "pointer",
          color: "gray",
          fontSize: "24px",
        }}
      />
      <Typography variant="h5" gutterBottom>
        Options
      </Typography>
      <Grid container spacing={1}>
        {Object.entries(options).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => handleOptionChange(key, e)}
                />
              }
              label={`Only show venues with valid ${key.charAt(5).toUpperCase() + key.slice(6)}`}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography>Venues per page:</Typography>
          <Select
            value={venuesPerPage}
            onChange={handleVenuesPerPageChange}
            fullWidth
          >
            {[10, 25, 50, 100].map((number) => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Button
        onClick={toggleOptionsOpen}
        fullWidth
        sx={{
          mt: 4,
          bgcolor: "var(--button-bg-color-cancel)",
          "&:hover": { backgroundColor: "var(--button-bg-color-hover-cancel)" },
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default Options;
