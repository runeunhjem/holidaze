import useStore from "../hooks/useStore";

const useAccessToken = () => {
  const { accessToken } = useStore(); // Retrieve accessToken directly
  return accessToken;
};

export default useAccessToken;
