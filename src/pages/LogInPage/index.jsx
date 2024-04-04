import { useEffect } from "react";
import useStore from "../../hooks/useStore";

function LogInPage() {
  useEffect(() => {
    document.title = "Holidaze - Login";
  }, []);


  const logIn = useStore((state) => state.logIn);

  return (
    <form className="login">
      <h2>Log In</h2>
      {/* Login form fields */}
      <button type="submit"
        aria-label="Submit login form"
        onClick={ logIn }
        className="bg-gray-800 text-gray-200 px-4 py-1 rounded-md">
        Log In
      </button>
    </form>
  );
}

export default LogInPage;
