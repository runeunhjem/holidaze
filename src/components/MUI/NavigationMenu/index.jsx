import React from "react";
import { useNavigate } from "react-router-dom";
// import useStore from "../../../hooks/useStore";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
// import Stack from "@mui/material/Stack";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "@emotion/react";

export default function NavigationMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  // const { isAuthenticated } = useStore((state) => ({ isAuthenticated: state.isAuthenticated }));
  const theme = useTheme();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }
  //   prevOpen.current = open;
  // }, [open]);

  return (
    <div className="md:hidden">
      <Button
        ref={anchorRef}
        id="burger-button"
        aria-controls={open ? "burger-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        aria-label="Navigation menu"
        onClick={handleToggle}
        sx={{
          p: 1,
          justifyContent: "flex-end",
          borderRadius: "5px",
        }}
        startIcon={
          open ? (
            <FiX className="text-gray-900 dark:text-gray-100 me-2" />
          ) : (
            <FiMenu className="text-gray-900 dark:text-gray-100 me-2" />
          )
        }>
        <span className="hidden">Navigation Menu</span>
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="top-start"
        transition
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [-12, 8], // Moves the menu 16px to the left; adjust as needed
            },
          },
        ]}
        sx={{ zIndex: 1300, borderRadius: "5px" }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "top-start" ? "right bottom" : "left top" }}>
            <Paper
              sx={{
                borderRadius: "5px",
                borderColor: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
                borderWidth: 1,
                borderStyle: "solid",
              }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  sx={{
                    borderRadius: "5px",
                    // "&:hover": {
                    //   backgroundColor: "var(--sky-300)", // Custom hover color
                    // },
                  }}
                  autoFocusItem={open}
                  id="burger-menu"
                  aria-labelledby="burger-button"
                  className="dark:bg-gray-800"
                  onKeyDown={handleListKeyDown}>
                  {/* {isAuthenticated ? (
                    <div> */}
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-200)" : "var(--sky-100)",
                        color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/")}>
                    Home
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-200)" : "var(--sky-100)",
                        color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/destinations")}>
                    Destinations
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-200)" : "var(--sky-100)",
                        color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/about")}>
                    About Us
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-200)" : "var(--sky-100)",
                        color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/contact")}>
                    Contact Us
                  </MenuItem>
                  {/* </div>
                  ) : (
                    <div>
                      <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
                      <MenuItem onClick={() => handleNavigate("/destinations")}>Destinations</MenuItem>
                      <MenuItem onClick={() => handleNavigate("/about")}>About Us</MenuItem>
                      <MenuItem onClick={() => handleNavigate("/contact")}>Contact Us</MenuItem>
                    </div>
                  )} */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}