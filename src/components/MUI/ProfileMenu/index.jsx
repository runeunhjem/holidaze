import * as React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../hooks/useStore";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@emotion/react";
import defaultAvatarImage from "../../../assets/images/default-profile-image.png";

export default function MenuListComposition() {
  const userDetails = useStore((state) => state.userDetails);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);
  const navigate = useNavigate();
  const { isAuthenticated, clearUser } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,

    clearUser: state.clearUser,
  }));

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

  const handleLogOut = () => {
    clearUser();
    navigate("/");
    setOpen(false);
  };

  React.useEffect(() => {}, [isAuthenticated]);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const avatarUrl = userDetails?.avatar?.url || defaultAvatarImage;
  const userName = userDetails?.name || "User";

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        fontSize: 10,
        mx: 0,
        my: 1,
        py: 0,
        justifyContent: "flex-end",
      }}
    >
      <Button
        className="header-nav-links"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        aria-label="Profile menu"
        onClick={handleToggle}
        startIcon={
          open ? (
            <FiChevronUp className="h-6 w-6 dark:text-gray-200" />
          ) : (
            <FiChevronDown className="h-6 w-6 dark:text-gray-200" />
          )
        }
        sx={{
          color: theme.palette.mode === "light" ? "#1F2937" : "#F9FAFB",
          backgroundColor:
            theme.palette.mode === "light"
              ? "var(--sky-50)"
              : "var(--gray-700)",
          borderRadius: "32px",
          width: "80px",
          py: "6px",
          alignItems: "center",
          justifyContent: "center",
          mx: 0,
          px: 0,
        }}
      >
        <Avatar
          sx={{
            px: 0,
            mx: 0,
            width: 24,
            height: 24,
            fontSize: 12,
            alignItems: "center",
            backgroundColor:
              isAuthenticated && userDetails?.avatar?.url
                ? "transparent"
                : theme.palette.mode === "light"
                  ? "var(--sky-100)"
                  : "var(--gray-100)",
            color:
              theme.palette.mode === "light"
                ? "var(--gray-900)"
                : "var(--gray-900)",
            border: "1px solid",
            borderColor:
              theme.palette.mode === "light"
                ? "var(--gray-300)"
                : "var(--sky-100)",
          }}
          src={isAuthenticated ? avatarUrl : ""}
          alt={userName}
        >
          {!isAuthenticated && <FiUser />}
        </Avatar>
        <span className="hidden">User menu</span>
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
              offset: [-14, 12],
            },
          },
        ]}
        sx={{ zIndex: 10 }}
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
                width: "180px !important",
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
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  className="dark:bg-gray-800"
                  sx={{
                    ".MuiList-root": {
                      backgroundColor: "var(--body-bg-color)",
                      color: "var(--profile-text-color)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "5px",
                    },
                    width: "180px !important",
                    py: 0,
                    borderRadius: "5px",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "var(--gray-800)"
                        : "var(--sky-50)",
                  }}
                  onKeyDown={handleListKeyDown}
                >
                  {isAuthenticated
                    ? [
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
                          key="profile"
                          onClick={() =>
                            handleNavigate(
                              `/profile/${encodeURIComponent(userDetails.username)}`,
                            )
                          }
                        >
                          Profile
                        </MenuItem>,
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
                          key="myFavorites"
                          onClick={() => handleNavigate("/myFavorites")}
                        >
                          My favorites
                        </MenuItem>,
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
                          key="myBookings"
                          onClick={() => handleNavigate("/myBookings")}
                        >
                          My bookings
                        </MenuItem>,
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
                          key="myVenues"
                          onClick={() => handleNavigate("/myVenues")}
                        >
                          My venues
                        </MenuItem>,
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
                          key="logout"
                          onClick={handleLogOut}
                        >
                          Logout
                        </MenuItem>,
                      ]
                    : [
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
                          key="login"
                          onClick={() => handleNavigate("/login")}
                        >
                          Log In
                        </MenuItem>,
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
                          key="register"
                          onClick={() => handleNavigate("/register")}
                        >
                          Register
                        </MenuItem>,
                      ]}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
