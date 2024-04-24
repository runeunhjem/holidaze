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
import "./index.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logIn } = useAuth(); // Destructure logIn directly from useAuth
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Holidaze - Login";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Explore our wide range of destinations from around the world to find your special place.",
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
        <Typography component="h1" variant="h5">
          Login
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
            sx={ {
              mt: 3,
              mb: 2,
              color: "var(--button-text-color)",
              backgroundColor: "var(--button-bg-color)",
              "&:hover": {
                backgroundColor: "var(--button-bg-color-hover)",
                color: "var(--button-text-color-hover)",
                outline: "1px solid var(--border-color)",
              },
            } }
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
    </Container>
  );
}

export default LoginPage;
