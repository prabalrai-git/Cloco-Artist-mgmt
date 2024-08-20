import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    setIsLoading(false);
  }, []);

  return { token, isLoading };
};

export default useAuth;
