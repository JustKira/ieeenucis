import useCountdownTimer from "@/lib/hooks/useCountdownTimer";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@iconify/react/dist/iconify.js";

function Timer({
  startDate,
  duration,
}: {
  startDate: string;
  duration: number;
}) {
  const { countdown, hasPassedTimer, remainingTime } = useCountdownTimer(
    startDate,
    duration
  );
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    const incrementCounter = () => {
      setCounter((prevCounter) => prevCounter - 1000);
    };

    // Create an interval that calls incrementCounter every 1000ms (1 second)
    const intervalId = setInterval(incrementCounter, 1000);

    // Clean up the interval when the component unmounts or when counter reaches a certain value
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    if (hasPassedTimer) {
      window.location.reload();
    }
  }, [hasPassedTimer]);
  return (
    <Alert>
      <Icon icon={"oi:timer"} className="w-4 h-4" />
      <AlertTitle>Quiz Timer</AlertTitle>

      <AlertDescription>
        {Math.floor((counter / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0")}
        h :
        {Math.floor((counter / (1000 * 60)) % 60)
          .toString()
          .padStart(2, "0")}
        m :
        {Math.floor((counter / 1000) % 60)
          .toString()
          .padStart(2, "0")}
        s
      </AlertDescription>
    </Alert>
  );
}

export default Timer;
