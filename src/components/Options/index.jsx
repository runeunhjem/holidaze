// src/components/Options/index.jsx
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import useStore from "../../hooks/useStore";

const Options = () => {
  const { options, setOptions, toggleOptionsOpen, optionsMenuIsOpen } =
    useStore((state) => ({
      options: state.options,
      setOptions: state.setOptions,
      toggleOptionsOpen: state.toggleOptionsOpen,
      optionsMenuIsOpen: state.optionsMenuIsOpen,
    }));

  const handleOptionChange = (field, event) => {
    setOptions({ ...options, [field]: event.target.checked });
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
        maxWidth: "600px",
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
        opacity: optionsMenuIsOpen ? 1 : 0, // Control visibility using Zustand state
        visibility: optionsMenuIsOpen ? "visible" : "hidden", // Control visibility using Zustand state
      }}
    >
      <Typography className="pb-4" variant="h5" gutterBottom>
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
      </Grid>
      <Button
        onClick={toggleOptionsOpen}
        fullWidth
        sx={{
          mt: 4,
          width: "100%",
          bgcolor: "var(--button-bg-color-cancel)",
          color: "var(--button-text-color-cancel)",
          "&:hover": {
            backgroundColor: "var(--button-bg-color-hover-cancel)",
            color: "var(--button-text-color-hover-cancel)",
          },
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default Options;
