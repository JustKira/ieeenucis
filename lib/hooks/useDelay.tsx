import { useEffect } from "react";

const useDelay = (callback: () => void, delay: number): void => {
  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
};

export default useDelay;
