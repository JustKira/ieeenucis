import { useState, useEffect } from "react";

function useCountdownTimer(startAt?: string, durationInMinutes?: number) {
  const [countdown, setCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [hasPassedTimer, setHasPassedTimer] = useState(false);

  useEffect(() => {
    let examDate: Date | undefined;
    if (startAt) {
      examDate = new Date(Date.parse(startAt + "Z")); // Append 'Z' to ensure UTC time
    }

    const calculateCountdown = () => {
      if (examDate && durationInMinutes) {
        const remainingTime =
          examDate.getTime() + durationInMinutes * 60000 - Date.now();

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

  return { countdown, hasPassedTimer };
}

export default useCountdownTimer;
