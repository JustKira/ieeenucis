import useCountdownTimer from "@/lib/hooks/useCountdownTimer";
import React from "react";
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
  return (
    <Alert>
      <Icon icon={"oi:timer"} className="h-4 w-4" />
      <AlertTitle>Quiz Timer</AlertTitle>
      <AlertDescription>
        {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
      </AlertDescription>
    </Alert>
  );
}

export default Timer;
