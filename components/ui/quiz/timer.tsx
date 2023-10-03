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
  const [start, setStart] = useState<boolean>();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let examDate: Date | undefined;
    let serverTime: Date | undefined;
    if (startDate) {
      examDate = new Date(Date.parse(startDate + "Z")); // Append 'Z' to ensure UTC time
    }

    async function getTime() {
      const response = await fetch(`${window.location.origin}/api/timer`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          updater: Math.random(),
        }),
      });

      if (response.ok) {
        const serverTimeData = await response.json();
        serverTime = new Date(serverTimeData.now);

        if (examDate && duration && serverTime) {
          const newRemainingTime =
            examDate.getTime() + duration * 60000 - serverTime.getTime();
          setStart(true);
          setCounter(newRemainingTime); // Update remainingTime using state
        }
      }
    }

    getTime();
  }, [startDate, duration]);

  useEffect(() => {
    if (!start) return;
    let examDate: Date | undefined;
    if (startDate) {
      examDate = new Date(Date.parse(startDate + "Z")); // Append 'Z' to ensure UTC time
    }
    if (examDate && duration) {
      setCounter((prevRemainingTime) => prevRemainingTime - 1000); // Update remainingTime using state
    }
  }, [start]);

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
