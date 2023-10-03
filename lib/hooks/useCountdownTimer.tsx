import { useState, useEffect } from "react";

function useCountdownTimer(startAt?: string, durationInMinutes?: number) {
  const [countdown, setCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [hasPassedTimer, setHasPassedTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0); // Initialize remainingTime
  const [start, setStart] = useState(false);
  useEffect(() => {
    let examDate: Date | undefined;
    let serverTime: Date | undefined;
    if (startAt) {
      examDate = new Date(Date.parse(startAt + "Z")); // Append 'Z' to ensure UTC time
    }

    async function getTime() {
      const response = await fetch(`${window.location.origin}/api/timer`);

      if (response.ok) {
        const serverTimeData = await response.json();
        serverTime = new Date(serverTimeData.now);

        if (examDate && durationInMinutes && serverTime) {
          const newRemainingTime =
            examDate.getTime() +
            durationInMinutes * 60000 -
            serverTime.getTime();
          setStart(true);
          setRemainingTime(newRemainingTime); // Update remainingTime using state
        }
      }
    }

    getTime();

    const calculateCountdown = () => {
      if (!start) return;
      if (examDate && durationInMinutes) {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000); // Update remainingTime using state

        if (remainingTime <= 0) {
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

  return { countdown, hasPassedTimer, remainingTime };
}

export default useCountdownTimer;
