import PropTypes from "prop-types";
import * as React from "react";
import { Unstable_NumberInput as BaseNumberInput, numberInputClasses } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  border: `1px solid ${theme.palette.mode === "dark" ? "var(--border-color)" : "var(--border-color)"}`,
  "&:hover": {
    borderColor: `var(--border-color)`,
  },
  backgroundColor: `var(--bg-header-${theme.palette.mode})`,
}));

const Label = styled("label")(({ theme, hasValueOrFocused }) => ({
  position: "absolute",
  left: "16px",
  top: "3px",
  transition: "all 0.2s ease",
  pointerEvents: "none",
  color: hasValueOrFocused ? `var(--link-color-${theme.palette.mode})` : "#666",
  transform: hasValueOrFocused ? "translateY(-13px)" : "translateY(10px)",
  fontSize: hasValueOrFocused ? "0.75em" : "1em",
  backgroundColor: hasValueOrFocused ? `var(--bg-footer-${theme.palette.mode})` : "transparent",
  padding: hasValueOrFocused ? "0 3px" : "0",
}));

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  width: 100%;
  height: 50px;
  padding: 12px;
  border-radius: 5px;
  color: var(--text-color-${theme.palette.mode});
  background: var(--bg-header-${theme.palette.mode});
  border: 1px solid var(--border-color-${theme.palette.mode});
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;
  box-sizing: border-box;
  outline: none;

  &.${numberInputClasses.focused}, &:focus {
    outline: 1px solid var(--link-color-${theme.palette.mode}-hover);
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  grid-column: 1/2;
  grid-row: 1/3;
  color: var(--text-color-${theme.palette.mode});
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  &::placeholder {
    color: transparent;
  }
  &:focus + label, &:not(:placeholder-shown) + label {
    transform: scale(0.75) translateY(-2px) translateX(16px);
    backgroundColor: var(--bg-footer-${theme.palette.mode});
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  // background: var(--bg-header-${theme.palette.mode});
  // color: var(--text-color-${theme.palette.mode});
  // &:hover {
  //   background: var(--link-color-${theme.palette.mode}-hover);
  //   border-color: var(--border-color-${theme.palette.mode});
  //   color: #FFF;
  // }
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
