import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";
import "./index.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logIn } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Login",
      "Log in to get full access to all our features and destinations from around the world to find your special place.",
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      await logIn(data);
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          style={{
            fontSize: "calc(1.5rem + 0.6vw)",
          }}
        >
          Login
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          style={{
            marginTop: "1rem",
            fontSize: "calc(1rem + 0.4vw)",
            textAlign: "center",
          }}
        >
          Some features are only available for logged in users.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            variant="outlined"
            autoFocus
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "var(--button-text-color)",
              backgroundColor: "var(--button-bg-color)",
              "&:hover": {
                backgroundColor: "var(--button-bg-color-hover)",
                color: "var(--button-text-color-hover)",
                outline: "1px solid var(--border-color)",
              },
            }}
          >
            Login
          </Button>
          {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{error}</Alert>
            </Stack>
          )}
        </Box>
      </Box>
      <Typography variant="body2" color="textSecondary" align="center">
        <span>Don&apos;t have an account yet?</span>
        <br />
        <Link
          to="/register"
          className="link"
          style={{
            color: "var(--link-color)",
            "&:hover": {
              color: "var(--link-color-hover)",
            },
          }}
        >
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
}

export default LoginPage;
