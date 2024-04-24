import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitError, setSubmitError] = React.useState("");

  useEffect(() => {
    document.title = "Holidaze - Contact";
  }, []);

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      console.log("Form Data Submitted:", data);
      // Simulate a successful submission
      alert("Message sent!");
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
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
          Contact Us
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
            label="Full Name"
            autoComplete="name"
            autoFocus
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters long.",
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address.",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Subject"
            {...register("subject", {
              required: "Subject is required",
              minLength: {
                value: 3,
                message: "Subject must be at least 3 characters long.",
              },
            })}
            error={!!errors.subject}
            helperText={errors.subject?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Message"
            multiline
            rows={4}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 3,
                message: "Message must be at least 3 characters long.",
              },
            })}
            error={!!errors.message}
            helperText={errors.message?.message}
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
            Send Message
          </Button>
          {submitError && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{submitError}</Alert>
            </Stack>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default ContactPage;
