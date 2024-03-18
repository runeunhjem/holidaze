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

export default function MenuListComposition() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);
  const navigate = useNavigate();
  const { isAuthenticated, logOut } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    logOut: state.logOut,
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
    logOut();
    navigate("/");
    setOpen(false);
  };

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

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
      }}>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={
          open ? (
            <FiChevronUp className="dark:text-gray-200 w-6 h-6" />
          ) : (
            <FiChevronDown className="dark:text-gray-200 w-6 h-6" />
          )
        }
        sx={{
          color: theme.palette.mode === "light" ? "#1F2937" : "#F9FAFB",
          borderRadius: "32px",
          width: "80px",
          py: "6px",
          alignItems: "center",
          justifyContent: "center",
          mx: 0,
          px: 0,
        }}>
        {isAuthenticated ? (
          <Avatar
            sx={{
              px: 0,
              mx: 0,
              width: 24,
              height: 24,
              fontSize: 12,
              alignItems: "center",
            }}
            src="https://portfolio1-ca.netlify.app/images/rune-profile-pic-medium.png"
            alt="Profile picture"
          />
        ) : (
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: 12,
            }}>
            <FiUser />
          </Avatar>
        )}
      </Button>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  className="dark:bg-gray-800"
                  onKeyDown={handleListKeyDown}>
                  {isAuthenticated
                    ? [
                        <MenuItem key="profile" onClick={() => handleNavigate("/profile")}>
                          Profile
                        </MenuItem>,
                        <MenuItem key="dashboard" onClick={() => handleNavigate("/dashboard")}>
                          My account
                        </MenuItem>,
                        <MenuItem key="logout" onClick={handleLogOut}>
                          Logout
                        </MenuItem>,
                      ]
                    : [
                        <MenuItem key="login" onClick={() => handleNavigate("/login")}>
                          Log In
                        </MenuItem>,
                        <MenuItem key="register" onClick={() => handleNavigate("/register")}>
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
