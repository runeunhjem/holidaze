import PropTypes from "prop-types";
import * as React from "react";
import { Unstable_NumberInput as BaseNumberInput, numberInputClasses } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

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

const Container = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  border: `1px solid ${theme.palette.mode === "dark" ? grey[700] : "rgba(0,0,0, 0.3)"}`,
  "&:hover": {
    borderColor: theme.palette.mode === "dark" ? grey[300] : grey[700],
  },
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : "transparent",
}));

const Label = styled("label")(({ theme, hasValueOrFocused }) => ({
  position: "absolute",
  left: "16px",
  top: "3px",
  transition: "all 0.2s ease",
  pointerEvents: "none",
  // color: hasValueOrFocused ? (theme.palette.mode === "dark" ? blue[300] : blue[400]) : "#666",
  color: hasValueOrFocused ? theme.palette.primary.main : "#666",
  transform: hasValueOrFocused ? "translateY(-13px)" : "translateY(10px)",
  fontSize: hasValueOrFocused ? "0.75em" : "1em",
  backgroundColor: hasValueOrFocused ? (theme.palette.mode === "dark" ? blue[900] : "#FFF") : "transparent",
  padding: hasValueOrFocused ? "0 3px" : "0",
  "&:not(:focus):placeholder-shown + label": {
    color: "theme.palette.mode === 'dark' ? grey[500] : grey[700]",
  },
}));

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  width: 100%;
  height: 50px;
  font-family: 'Roboto', 'Helvetica', 'IBM Plex Sans', sans-serif;
  font-size: 0.975rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 5px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "transparent"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"};
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;
  box-sizing: border-box;
  outline: none;

  &.${numberInputClasses.focused} {
    outline: 1px solid ${theme.palette.mode === "dark" ? blue[300] : blue[700]};
  }

  &:focus {
    // border: 2px solid ${theme.palette.mode === "dark" ? blue[300] : blue[700]};
    outline: 1px solid ${theme.palette.mode === "dark" ? blue[300] : blue[700]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.975rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  &::placeholder {
    // color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
    // opacity: 0.7;
    color: transparent;
  }
  &:focus + label: {
    color: theme.palette.mode === "dark" ? blue[300] : blue[400];
  }
  &:not(:focus):placeholder-shown + label: {
    color: theme.palette.mode === "dark" ? grey[500] : grey[700];
  }
  &:focus + label, &:not(:placeholder-shown) + label: {
    transform: scale(0.75) translateY(-2px) translateX(16px);
    backgroundColor: theme.palette.mode === "dark" ? grey[900] : "#fff";
    padding: 0 6px;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === "dark" ? blue[400] : blue[600]};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  }

  &:hover {
    cursor: pointer;
    color: #FFF;
    background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[400] : blue[600]};
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`
);

const CustomNumberInput = React.forwardRef(function CustomNumberInput({ label, ...props }, ref) {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleFocus = (e) => {
    setFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <Container>
      <Label theme={theme} hasValueOrFocused={focused || value.length > 0}>
        {label}
      </Label>
      <BaseNumberInput
        {...props}
        ref={ref}
        slots={{
          root: StyledInputRoot,
          input: StyledInputElement,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          input: {
            onFocus: handleFocus,
            onBlur: handleBlur,
            onChange: handleChange,
            value: value,
            readOnly: props.readOnly,
          },
          incrementButton: {
            children: "▴",
          },
          decrementButton: {
            children: "▾",
          },
        }}
      />
    </Container>
  );
});

CustomNumberInput.propTypes = {
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default function GuestsInput() {
  return <CustomNumberInput aria-label="Guests" label="Guests" placeholder="Guests" />;
}
