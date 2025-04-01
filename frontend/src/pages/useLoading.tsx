import { useState, useCallback } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  // useCallback impede a recriação da função `toggleLoading` a cada renderização
  const toggleLoading = useCallback(() => {
    setLoading((prev) => !prev);
  }, []);

  console.log("RENDER useLoading");

  return { loading, toggleLoading };
};

export default useLoading;
