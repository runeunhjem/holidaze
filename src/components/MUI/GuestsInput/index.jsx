import { useState } from "react";
import propTypes from "prop-types";
import { styled, useTheme } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  300: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#005CBF",
  800: "#004499",
  900: "#111827",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#6b7280",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#111827",
};

const Container = styled("div")(({ theme, isFocused, hasValue }) => ({
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: "5px",
  border: `1px solid ${
    (!isFocused && hasValue) || (!isFocused && !hasValue)
      ? theme.palette.mode === "dark"
        ? grey[500]
        : "rgba(0,0,0, 0.3)"
      : theme.palette.primary.main
  }`,
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : "transparent",
  "&:hover": {
    borderColor: theme.palette.mode === "dark" ? grey[300] : grey[700],
  },
  "&:focus + input": {
    borderColor: theme.palette.mode === "dark" ? blue[300] : blue[700],
    border: "2px solid",
  },
}));

const StyledInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "50px",
  alignItems: "center",
  padding: "12px",
  fontSize: "0.975rem",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: 400,
  borderRadius: "5px",
  lineHeight: 1.5,
  color: theme.palette.mode === "dark" ? grey[300] : grey[500],
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : "transparent",
  // border: "1px solid",
  // borderColor: theme.palette.mode === "dark" ? grey[700] : grey[100],
  outline: "none",
  "&::placeholder": {
    color: "transparent",
  },
  // "&:focus": {
  //   // border: "1px solid",
  //   borderColor: theme.palette.mode === "dark" ? grey[300] : blue[500],
  //   // outline: "1px solid",
  //   // outlineColor: theme.palette.mode === "dark" ? grey[300] : blue[300],
  // },
  // "&:focus + label": {
  //   color: theme.palette.mode === "dark" ? blue[300] : blue[400],
  // },
  // "&:not(:focus):placeholder-shown + label": {
  //   color: theme.palette.mode === "dark" ? grey[500] : grey[700],
  // },
  // "&:focus + label, &:not(:placeholder-shown) + label": {
  //   transform: "scale(0.75) translateY(-10px) translateX(16px)",
  //   backgroundColor: theme.palette.mode === "dark" ? grey[900] : "#fff",
  //   padding: "0 6px",
  // },
}));

const StyledLabel = styled("label")(({ theme, isFocused, hasValue }) => ({
  position: "absolute",
  top: 12,
  left: 12,
  // padding: "12px",
  pointerEvents: "none",
  transformOrigin: "top left",
  transform: "translateY(0px)",
  transition: "transform 0.2s, color 0.2s",
  color:
    (!isFocused && hasValue) || (!isFocused && !hasValue)
      ? theme.palette.mode === "light"
        ? "var(--gray-700)"
        : "var(--gray-400)"
      : theme.palette.primary.main,
  // backgroundColor: theme.palette.mode === "dark" ? grey[900] : "#fff",
  padding: "0 4px",
}));

// function GuestsInput({ label, ...props }) {
//   return (
//     <Container>
//       <StyledInput {...props} placeholder="Guests" type="number" />
//       <StyledLabel>{label}</StyledLabel>
//     </Container>
//   );
// }

// GuestsInput.propTypes = {
//   label: propTypes.string.isRequired,
// };

// export default GuestsInput;

const IncrementButton = styled("button")(({ theme }) => ({
  width: "24px",
  height: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: theme.palette.mode === "dark" ? grey[800] : grey[50],
  border: "none",
  borderRadius: "2px 0 0 0",
  "&:hover": {
    backgroundColor: blue[400],
  },
}));

const DecrementButton = styled(IncrementButton)({
  borderRadius: "0 2px 0 0px",
});

function GuestsInput({ label, ...props }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const hasValue = Boolean(value.length);

  const handleChange = (e) => {
    const val = e.target.value;
    // Check if the input is a number and greater than or equal to 1
    if (val === "" || (/^\d+$/.test(val) && Number(val) >= 1)) {
      setValue(val);
    } else {
      setValue(""); // Reset to empty if input is invalid
    }
  };

  // const handleIncrement = () => {
  //   setValue((prevValue) => String(Number(prevValue) + 1));
  // };

  // const handleDecrement = () => {
  //   setValue((prevValue) => String(Number(prevValue) - 1));
  // };

  return (
    <Container theme={theme} isFocused={isFocused} hasValue={hasValue}>
      <StyledInput
        {...props}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        id="GuestsInputId"
      />
      <StyledLabel
        theme={theme}
        isFocused={isFocused}
        hasValue={hasValue}
        htmlFor="GuestsInputId"
        style={{
          color: "var(--input-text-color)",
          backgroundColor: theme.palette.mode === "dark" ? "var(--header-bg-color)" : "var(--header-bg-color)",
          transform: isFocused || value ? "scale(0.75) translateY(-28px) translateX(-10px)" : "translateY(0px)",
        }}>
        {label}
      </StyledLabel>
      <div className="flex-col">
        <IncrementButton
          sx={{
            borderRadius: "5px 5px 0 0",
            backgroundColor: theme.palette.mode === "dark" ? "var(--gray-800)" : "var(--sky-50)",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-200)" : "var(--blue-300)",
              color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
            },
          }}
          onClick={() => setValue(String(Number(value) + 1))}>
          +
        </IncrementButton>
        <DecrementButton
          sx={{
            borderRadius: "0 0 5px 5px",
            backgroundColor: theme.palette.mode === "dark" ? "var(--gray-800)" : "var(--sky-50)",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-200)" : "var(--blue-300)",
              color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
            },
          }}
          onClick={() => setValue(String(Math.max(Number(value) - 1, 0)))}>
          -
        </DecrementButton>
      </div>
    </Container>
  );
}

GuestsInput.propTypes = {
  label: propTypes.string.isRequired,
};

export default GuestsInput;
