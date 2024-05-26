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
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import contact1 from "../../assets/images/contact-1.png";
import AddMissingFormLabelsToMUI from "../../utils/addMissingFormLabelsToMUI";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitError, setSubmitError] = React.useState("");
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Contact us",
      "Get in touch with us for any inquiries or assistance.",
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitSuccess(true);
      setSubmitError("");
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
      }, 4000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
      setSubmitSuccess(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <AddMissingFormLabelsToMUI />{" "}
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Contact Us
        </Typography>
        <Box sx={{ mt: 8, textAlign: "center", width: "100%", maxWidth: 600 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Opening Hours:
          </Typography>
          <Typography>Monday-Saturday (08.00 / 8am - 17.00 / 5pm)</Typography>
          <Divider sx={{ my: 1, width: "70%", mx: "auto" }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Phone Number:
          </Typography>
          <Typography>
            <a href="tel:+6312345678">+63 12 345678</a>
          </Typography>
          <Divider sx={{ my: 1, width: "70%", mx: "auto" }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Email:
          </Typography>
          <Typography>
            <a href="mailto:customerservice@holidaze.com">
              customerservice@holidaze.com
            </a>
          </Typography>
          <Divider sx={{ my: 1, width: "70%", mx: "auto" }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Visiting Address:
          </Typography>
          <Typography>
            <a href="https://maps.app.goo.gl/VsEJasgAo86gVSki7" target="_blank">
              Slettheiveien 81E, 4626 Kristiansand, Norway
            </a>
          </Typography>
          <Divider sx={{ my: 1, width: "70%", mx: "auto" }} />
        </Box>
        <img
          src={contact1}
          alt="Contact Us"
          style={{ width: "100%", marginTop: "2rem", borderRadius: "20px" }}
        />
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 8, width: "100%", maxWidth: 600 }}
        >
          <Typography component="h2" variant="h5" className="text-center">
            Send us a message
          </Typography>
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
          <FormControlLabel
            control={<Checkbox {...register("venueManager")} />}
            label="I am a Venue Manager."
          />
          {submitSuccess && (
            <Stack sx={{ width: "100%", mt: 4 }} spacing={2}>
              <Alert severity="success">Message sent successfully!</Alert>
            </Stack>
          )}
          {submitError && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{submitError}</Alert>
            </Stack>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "var(--button-bg-color)",
              color: "var(--button-text-color)",
              "&:hover": {
                bgcolor: "var(--button-bg-color-hover)",
                color: "var(--button-text-color-hover)",
                outline: "1px solid var(--border-color)",
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ContactPage;
