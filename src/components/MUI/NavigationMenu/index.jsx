import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "@emotion/react";

export default function NavigationMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
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
            <FiX className="me-2 text-gray-900 dark:text-gray-100" />
          ) : (
            <FiMenu className="me-2 text-gray-900 dark:text-gray-100" />
          )
        }
      >
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
              offset: [-12, 8],
            },
          },
        ]}
        sx={{ zIndex: 1300, borderRadius: "5px" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "top-start" ? "right bottom" : "left top",
            }}
          >
            <Paper
              sx={{
                borderRadius: "5px",
                borderColor:
                  theme.palette.mode === "dark"
                    ? "var(--yellow-400)"
                    : "var(--sky-300)",
                borderWidth: 1,
                borderStyle: "solid",
                width: "160px !important",
                ".MuiList-root": {
                  backgroundColor: "var(--body-bg-color)",
                  color: "var(--profile-text-color)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "5px",
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  sx={{
                    borderRadius: "5px",
                    ".MuiList-root": {
                      backgroundColor: "var(--body-bg-color)",
                      color: "var(--profile-text-color)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "5px",
                    },
                    width: "160px",
                    py: 0,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "var(--gray-800)"
                        : "var(--sky-50)",
                  }}
                  autoFocusItem={open}
                  id="burger-menu"
                  aria-labelledby="burger-button"
                  className="dark:bg-gray-800"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "var(--yellow-200)"
                            : "var(--sky-200)",
                        borderRadius: "5px",
                        color:
                          theme.palette.mode === "dark"
                            ? "var(--gray-900)"
                            : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/")}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "var(--yellow-200)"
                            : "var(--sky-200)",
                        borderRadius: "5px",
                        color:
                          theme.palette.mode === "dark"
                            ? "var(--gray-900)"
                            : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/destinations")}
                  >
                    Destinations
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "var(--yellow-200)"
                            : "var(--sky-200)",
                        borderRadius: "5px",
                        color:
                          theme.palette.mode === "dark"
                            ? "var(--gray-900)"
                            : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/about")}
                  >
                    About Us
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "var(--yellow-200)"
                            : "var(--sky-200)",
                        borderRadius: "5px",
                        color:
                          theme.palette.mode === "dark"
                            ? "var(--gray-900)"
                            : "var(--gray-900)",
                      },
                    }}
                    onClick={() => handleNavigate("/contact")}
                  >
                    Contact Us
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
