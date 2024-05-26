import useStore from "../hooks/useStore";

const useAccessToken = () => {
  const { accessToken } = useStore();
  return accessToken;
};

export default useAccessToken;
