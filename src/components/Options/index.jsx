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
  const { options, setOptions, toggleOptionsOpen } = useStore((state) => ({
    options: state.options,
    setOptions: state.setOptions,
    toggleOptionsOpen: state.toggleOptionsOpen,
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
      }}
    >
      <Typography variant="h6" gutterBottom>
        Options
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(options).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => handleOptionChange(key, e)}
                />
              }
              label={`Check ${key.charAt(0).toUpperCase() + key.slice(1)} Validity`}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => toggleOptionsOpen()}
        fullWidth
        sx={{ mt: 2, bgcolor: "var(--button-bg-color-cancel)" }}
      >
        Close
      </Button>
    </Box>
  );
};

export default Options;

// import PropTypes from "prop-types";
// import {
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Button,
//   Typography,
// } from "@mui/material";

// const Options = ({ optionsMenuIsOpen, onClose, options, onOptionsChange }) => {
//   const handleOptionChange = (field, event) => {

//     onOptionsChange({
//       ...options,
//       [field]: event.target.checked,
//     });
//     console.log(`Options changed: ${field} set to ${event.target.checked}`);
//   };

//   console.log("Current Options State:", options);

//   return (
//     <Box
//       className="custom-scrollbar"
//       id="options"
//       sx={{
//         position: "absolute",
//         bottom: "-15px",
//         left: "50%",
//         transform: "translate(-50%, 100%)",
//         width: "90vw",
//         maxWidth: "600px",
//         maxHeight: "60vh",
//         overflowY: "auto",
//         bgcolor: "var(--header-bg-color)",
//         boxShadow: 24,
//         outline: "1px solid var(--border-color)",
//         borderRadius: "20px",
//         p: { xs: 2, sm: 4 },
//         zIndex: 1300,
//         opacity: optionsMenuIsOpen ? 1 : 0,
//         visibility: optionsMenuIsOpen ? "visible" : "hidden",
//         transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
//         minWidth: { xs: "250px", sm: "600px" },
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Options
//       </Typography>

//       <Grid container spacing={2}>
//         {[
//           { field: "checkImage", label: "Check Image Validity" },
//           { field: "checkTitle", label: "Check Title Validity" },
//           { field: "checkCountry", label: "Check Country Validity" },
//         ].map(({ field, label }) => (
//           <Grid item xs={12} key={field}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={options[field]} // Ensure this is correctly bound
//                   onChange={(e) => handleOptionChange(field, e)}
//                 />
//               }
//               label={label}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <Box display="flex" justifyContent="space-between" mt={2}>
//         <Button
//           onClick={onClose}
//           sx={{
//             width: "100%",
//             bgcolor: "var(--button-bg-color-cancel)",
//             color: "var(--button-text-color-cancel)",
//             "&:hover": {
//               backgroundColor: "var(--button-bg-color-hover-cancel)",
//               color: "var(--button-text-color-hover-cancel)",
//             },
//           }}
//         >
//           Close
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// Options.propTypes = {
//   optionsMenuIsOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   options: PropTypes.object.isRequired,
//   onOptionsChange: PropTypes.func.isRequired,
// };

// export default Options;

// src/components/Options/index.jsx
