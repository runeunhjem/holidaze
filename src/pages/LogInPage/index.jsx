import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { save } from "../../utils/storage"; // Make sure the path is correct

function LogInPage() {

  useEffect(() => {
    document.title = "Holidaze - Log In";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Explore our wide range of destinations from around the world to find your special place."
    );
  }, []);

  const { logIn } = useAuth();
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await logIn(data);
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    }
  };

  const handleCheatLogin = () => {
    setIsAuthenticated(true); // Set Authenticated to true when "Cheat Login" is clicked
    save("isAuthenticated", true); // Save the authentication status in localStorage
    navigate("/"); // Navigate to the homepage
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          <Button onClick={handleCheatLogin} fullWidth variant="outlined" sx={{ mb: 2 }}>
            Cheat login
          </Button>
          {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{error}</Alert>
            </Stack>
          )}
          {isAuthenticated && <Navigate to="/" />}
        </Box>
      </Box>
    </Container>
  );
}

export default LogInPage;
