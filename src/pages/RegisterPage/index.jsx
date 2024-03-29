import { useEffect } from "react";

function RegisterPage() {

  useEffect(() => {
    document.title = "Holidaze - Register";
  }, []);

  // Handle registration logic

  return (
    <form className="register">
      <h2>Register</h2>
      {/* Registration form fields */}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;