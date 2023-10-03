import { useState, useEffect } from "react";
import { hasDatePassed } from "../utils";
import { NamedImportBindings } from "typescript";

function useCountdownTimer(startAt?: string, durationInMinutes?: number) {
  const [countdown, setCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [hasPassedTimer, setHasPassedTimer] = useState(false);

  useEffect(() => {
    let examDate: Date | undefined;
    let serverTime: Date | undefined;
    let remainingTime: number = 0;
    if (startAt) {
      examDate = new Date(Date.parse(startAt + "Z")); // Append 'Z' to ensure UTC time
    }

    async function getTime() {
      const response = await fetch(`${window.location.origin}/api/timer`);

      if (response.ok) {
        const serverTimeData = await response.json();
        serverTime = new Date(serverTimeData.now);
        // console.log(serverTime);

        if (examDate && durationInMinutes && serverTime) {
          remainingTime =
            examDate.getTime() +
            durationInMinutes * 60000 -
            serverTime.getTime();

          // console.log(remainingTime);
        }
      }
    }

    getTime();

    const calculateCountdown = () => {
      if (examDate && durationInMinutes) {
        // getTime()
        --remainingTime;
        // console.log(remainingTime);
        if (remainingTime <= 0) {
          //hasDatePassed()
          setHasPassedTimer(true);
        } else {
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);

          setCountdown({
            hours: hours.toString().padStart(2, "0"),
            minutes: minutes.toString().padStart(2, "0"),
            seconds: seconds.toString().padStart(2, "0"),
          });
        }
      } else {
        setHasPassedTimer(false);
      }
    };

    const timerInterval = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [startAt, durationInMinutes]);

  return { countdown, hasPassedTimer };
}

export default useCountdownTimer;
