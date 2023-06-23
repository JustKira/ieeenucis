import { useEffect, useState } from "react";

const useBoolDelay = (
  value: boolean,
  delay: number,
  onWay?: boolean
): boolean => {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (onWay === true) {
      if (value) {
        timeout = setTimeout(() => {
          setDelayedValue(value);
        }, delay);
      } else {
        setDelayedValue(value);
      }
    } else if (onWay === false) {
      if (!value) {
        timeout = setTimeout(() => {
          setDelayedValue(value);
        }, delay);
      } else {
        setDelayedValue(value);
      }
    } else {
      timeout = setTimeout(() => {
        setDelayedValue(value);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [value, onWay, delay]);

  return delayedValue;
};

export default useBoolDelay;
