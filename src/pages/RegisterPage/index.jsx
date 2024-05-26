import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchApi } from "../../utils/fetchApi";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";
import "./index.css";

function RequiredLabel({ label, required }) {
  return (
    <div>
      {label}
      {required && (
        <span style={{ color: "red", backgroundColor: "var(--body-bg-color)" }}>
          {" "}
          *
        </span>
      )}
    </div>
  );
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError: setFormError,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Register for an account",
      "Register for full access to all our features and destinations from around the world.",
    );
  }, []);

  const onSubmit = async (data) => {
    if (data.password !== data.retypePassword) {
      setFormError("retypePassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const requestData = {
      name: data.name,
      email: data.email,
      password: data.password,
      bio: data.bio,
      avatar: {
        url: data.avatarUrl,
        alt: data.avatarAlt,
      },
      banner: {
        url: data.bannerUrl,
        alt: data.bannerAlt,
      },
      venueManager: data.venueManager || false,
    };
    try {
      await fetchApi("register", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please check your information.");
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
          Register
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <span>Already have an account?</span>
          <br />
          <Link
            to="/login"
            className="link"
            style={{
              color: "var(--link-color)",
              "&:hover": {
                color: "var(--link-color-hover)",
              },
            }}
          >
            Log in
          </Link>
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
            label={<RequiredLabel label="Name" required />}
            autoComplete="name"
            autoFocus
            {...register("name", {
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label={<RequiredLabel label="Email Address" required />}
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
            label={<RequiredLabel label="Password" required />}
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: 8,
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label={<RequiredLabel label="Retype Password" required />}
            type="password"
            autoComplete="new-password"
            {...register("retypePassword", {
              validate: (value) => value === password || "Passwords must match",
            })}
            error={!!errors.retypePassword}
            helperText={errors.retypePassword?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Bio (Optional)"
            {...register("bio")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Avatar URL (Optional)"
            {...register("avatarUrl")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Avatar Alt Text (Optional)"
            {...register("avatarAlt")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Banner URL (Optional)"
            {...register("bannerUrl")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Banner Alt Text (Optional)"
            {...register("bannerAlt")}
          />
          <FormControlLabel
            control={<Checkbox {...register("venueManager")} />}
            label="Venue Manager (Do you want to add your own venues for rent?)"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              color: "var(--button-text-color)",
              backgroundColor: "var(--button-bg-color)",
              mt: 3,
              mb: 8,
              "&:hover": {
                color: "var(--button-text-color-hover)",
                backgroundColor: "var(--button-bg-color-hover)",
                outline: "1px solid var(--border-color)",
              },
            }}
          >
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

RequiredLabel.propTypes = {
  label: propTypes.string.isRequired,
  required: propTypes.bool,
};

export default RegisterPage;
