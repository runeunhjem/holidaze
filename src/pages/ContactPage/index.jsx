import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import * as S from "./index.styled";

function ContactPage() {
  useEffect(() => {
    document.title = "Contact Page";
  }, []);
  const theme = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });
  const [touchedFields, setTouchedFields] = useState({});
  const [validationMessages, setValidationMessages] = useState({});
  const [inputStyles, setInputStyles] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateInputStyles = (name, isValid) => {
    setInputStyles((prevStyles) => ({
      ...prevStyles,
      [name]: isValid ? theme.successMessage : theme.errorMessage,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value.trim() !== "" || touchedFields[name]) {
      updateInputStyles(name, value);
      checkFieldValidation(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prevState) => ({
      ...prevState,
      [name]: true,
    }));
    checkFieldValidation(name, value);
  };

  const checkFieldValidation = (name, value) => {
    const isValid = validateField(name, value);
    setInputStyles((prevStyles) => ({
      ...prevStyles,
      [name]: isValid ? theme.successMessage : theme.errorMessage,
    }));
    const message = validateFormMessage(name, value, isValid);
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: message,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /\S+@\S+\.\S+/.test(value);
      case "fullName":
      case "subject":
      case "message":
        return value.trim().length >= 3;
      default:
        return false;
    }
  };

  const validateFormMessage = (name, value, isValid) => {
    if (value.trim() === "") {
      return `The ${camelCaseToTitle(name)} is required.`;
    }
    switch (name) {
      case "email":
        return isValid ? "" : "Please enter a valid email address.";
      case "fullName":
        return isValid ? "" : "Full name must be at least 3 characters.";
      case "subject":
        return isValid ? "" : "Subject must be at least 3 characters.";
      case "message":
        return isValid ? "" : "Message must be at least 3 characters.";
      default:
        return "";
    }
  };

  const camelCaseToTitle = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = Object.keys(formData).every((name) => validateField(name, formData[name]));

    if (isFormValid) {
      console.log("Form is valid, submitting data:", formData);

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);

      setFormData({ fullName: "", subject: "", email: "", message: "" });
      setInputStyles({});
      setTouchedFields({});
      setValidationMessages({});
    }
  };

  return (
    <S.MainContainer id="ContactPage">
      <S.FormTitle>Contact Us</S.FormTitle>
      <S.ContactForm onSubmit={handleSubmit}>
        {Object.entries(formData).map(([name, value]) => (
          <S.FormField key={name}>
            <S.Label htmlFor={name}>{camelCaseToTitle(name)}</S.Label>
            {name !== "message" ? (
              <S.Input
                type={name === "email" ? "email" : "text"}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`Enter your ${camelCaseToTitle(name)}`}
                required
                $inputColor={inputStyles[name]}
              />
            ) : (
              <S.TextArea
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                $inputColor={inputStyles[name]}
                placeholder="Enter your message"
                required></S.TextArea>
            )}
            {touchedFields[name] && validationMessages[name] && (
              <S.ValidationMessage>{validationMessages[name]}</S.ValidationMessage>
            )}
          </S.FormField>
        ))}
        <S.SubmitButton className="submitButton" type="submit" $isSubmitted={isSubmitted}>
          {isSubmitted ? <>Sent Successfully </> : "Send Message"}
        </S.SubmitButton>
      </S.ContactForm>
    </S.MainContainer>
  );
}

export default ContactPage;
