import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchApi } from "../../utils/fetchApi";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // Correctly include watch here
  const watchVenueManager = watch("venueManager", false); // Default value as false

  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      await fetchApi("v1Register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      // Handle successful registration (e.g., redirect to login page)
      Navigate("/login");
    } catch (error) {
      setError("Registration failed. Please check your information."); // Customize based on actual error response
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
        }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            autoComplete="name"
            autoFocus
            {...register("name", { required: "Name is required", pattern: /^[a-zA-Z0-9_]+$/ })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: /^[a-zA-Z0-9._%+-]+@(stud\.noroff\.no|noroff\.no)$/,
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password", { required: "Password is required", minLength: 8 })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField margin="normal" fullWidth label="Avatar URL (Optional)" autoComplete="off" {...register("avatar")} />
          <FormControlLabel control={<Checkbox {...register("venueManager")} />} label="Venue Manager" />
          {watchVenueManager && (
            <div>Additional fields for Venue Managers</div> // This will show up if the 'Venue Manager' checkbox is checked
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
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

export default RegisterPage;
