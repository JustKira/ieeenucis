import useCountdownTimer from "@/lib/hooks/useCountdownTimer";
import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@iconify/react/dist/iconify.js";

function Timer({
  startDate,
  duration,
}: {
  startDate: string;
  duration: number;
}) {
  const { countdown, hasPassedTimer } = useCountdownTimer(startDate, duration);

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
        {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
      </AlertDescription>
    </Alert>
  );
}

export default Timer;
