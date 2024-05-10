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
import { RiSettings4Line } from "react-icons/ri";

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

  // Define the order of the options here
  const optionOrder = [
    "checkImage",
    "minImagesCount",
    "checkTitle",
    "checkCountry",
    "checkContinent",
  ];

  const formatLabel = (key) => {
    switch (key) {
      case "minImagesCount":
        return "2 images or more";
      case "checkImage":
        return "valid image";
      case "checkContinent":
        return "valid continent";
      case "checkTitle":
        return "valid title";
      case "checkCountry":
        return "valid country";
      default:
        return key;
    }
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
      <Typography className="flex items-center" variant="h5" gutterBottom>
        <RiSettings4Line className="text-3xl me-4" style={ {
          color: "var(--link-color)",
        } } />
        Options
      </Typography>
      <Grid container spacing={1}>
        {optionOrder.map((key) => (
          <Grid item xs={12} key={key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={options[key]}
                  onChange={(e) => handleOptionChange(key, e)}
                />
              }
              label={`Only show venues with ${formatLabel(key)}`}
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
        width="100px"
        sx={{
          mt: 4,
          bgcolor: "var(--button-bg-color-cancel)",
          color: "var(--button-text-color-cancel)",
          "&:hover": { backgroundColor: "var(--button-bg-color-hover-cancel)" },
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default Options;
