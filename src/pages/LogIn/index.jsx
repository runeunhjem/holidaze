import useStore from "../../hooks/useStore";

function LogIn() {
  const logIn = useStore((state) => state.logIn);

  return (
    <div>
      <button onClick={logIn} className="bg-gray-800 text-gray-200 px-4 py-1 rounded-md">
        Log In
      </button>
    </div>
  );
}

export default LogIn;
