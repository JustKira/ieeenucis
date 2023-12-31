import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genUniqueId(): string {
  const dateStr = Date.now().toString(36);
  return `${dateStr}`;
}

export function formatTime(inputTime: string): string {
  const [hoursStr, minutesStr] = inputTime.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const hourString = hours === 1 ? `${hours} hour` : `${hours} hours`;
  const minuteString =
    minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  const resultString = `${hours !== 0 ? `${hourString}` : ""} ${
    hours !== 0 && minutes !== 0 ? "and" : ""
  } ${minutes !== 0 ? minuteString : ""}`;

  return resultString;
}

export const convertToTime = (sliderValue: number): string => {
  const totalMinutes = Math.round((sliderValue / 100) * 720); // 720 minutes between 12 AM and 12 PM
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const time = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return time;
};

export function convertToMinutes(inputTime: string): number {
  // Split the inputTime into hours and minutes
  const [hoursStr, minutesStr] = inputTime.split(":");

  // Convert hours and minutes to integers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Calculate the total minutes
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
}
export function snapTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Calculate the snapped minutes
  let snappedMinutes = Math.round(minutes / 5) * 5;

  // Adjust the hours and minutes if necessary
  let snappedHours = hours;
  if (snappedMinutes === 60) {
    snappedHours++;
    snappedMinutes = 0;
  }

  // Format the snapped time
  const snappedTime = `${snappedHours
    .toString()
    .padStart(2, "0")}:${snappedMinutes.toString().padStart(2, "0")}`;

  return snappedTime;
}
export function isDateMatch(dateString: string): boolean {
  const currentDate = new Date();

  const targetDate = new Date(dateString);
  targetDate.setDate(targetDate.getDate());

  console.log(targetDate.toISOString());
  // Extract date parts (year, month, and day) for comparison
  const currentDateParts = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  ];
  const targetDateParts = [
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  ];

  // Compare the date parts
  for (let i = 0; i < 3; i++) {
    if (currentDateParts[i] !== targetDateParts[i]) {
      return false; // Date does not match
    }
  }

  return true; // Date matches
}

function millisecondsToTime(milliseconds: number): string {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 milliseconds
  milliseconds %= 3600000;
  const minutes = Math.floor(milliseconds / 60000); // 1 minute = 60000 milliseconds
  milliseconds %= 60000;
  const seconds = Math.floor(milliseconds / 1000); // 1 second = 1000 milliseconds

  // Build the time string
  let timeString = "";
  if (hours > 0) {
    timeString += `${hours} hour${hours > 1 ? "s" : ""}, `;
  }
  if (minutes > 0) {
    timeString += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
  }
  if (seconds > 0) {
    timeString += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return timeString;
}

export async function hasDatePassed(
  inputDateString?: string
): Promise<boolean> {
  if (inputDateString) {
    try {
      // Make an HTTP request to your API to get the current time
      const response = await fetch(`${window.location.origin}/api/timer`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          updater: Math.random(),
        }),
      });

      if (response.ok) {
        const serverTimeData = await response.json();

        console.log("time", serverTimeData, inputDateString);
        const inputDate = new Date(inputDateString);

        // Extract the server time from the response
        const serverTime = new Date(serverTimeData.now);

        // Convert the input date to UTC
        const quizDate = new Date(inputDate.toISOString());

        console.log(
          `Input ${quizDate.getSeconds()}`,
          `ServerTime ${serverTime.getSeconds()}`
        );
        let remaningMillSec = quizDate.getTime() - serverTime.getTime();

        console.log(millisecondsToTime(remaningMillSec));
        // Compare the input date with the current UTC time
        return quizDate.getTime() <= serverTime.getTime();
      } else {
        console.error("Failed to fetch server time from your API");
        // Default to true if there's an error fetching server time
        return true;
      }
    } catch (error) {
      console.error("Error fetching server time from your API:", error);
      // Default to true if there's an error fetching server time
      return true;
    }
  }
  return true;
}

export async function dateWithIn(inputDateString?: string): Promise<boolean> {
  if (inputDateString) {
    try {
      // Make an HTTP request to your API to get the current time
      const response = await fetch(`${window.location.origin}/api/timer`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          updater: Math.random(),
        }),
      });

      if (response.ok) {
        const serverTimeData = await response.json();

        console.log("time", serverTimeData, inputDateString);
        const inputDate = new Date(inputDateString);

        // Extract the server time from the response
        const serverTime = new Date(serverTimeData.now);

        // Convert the input date to UTC
        const startDate = new Date(inputDate.toISOString());

        const endDate = new Date(inputDate.toISOString());
        startDate.setHours(0);
        startDate.setMinutes(0);
        console.log(
          `Start ${startDate.toISOString()}`,
          `End ${endDate.toISOString()}`,
          `ServerTime ${serverTime.toISOString()}`
        );
        let remaningMillSec = startDate.getTime() - serverTime.getTime();

        console.log(millisecondsToTime(remaningMillSec));
        // Compare the input date with the current UTC time
        console.log(serverTime.getTime() > startDate.getTime());
        console.log(serverTime.getTime() < endDate.getTime());
        return (
          serverTime.getTime() > startDate.getTime() &&
          serverTime.getTime() < endDate.getTime()
        );
      } else {
        console.error("Failed to fetch server time from your API");
        // Default to true if there's an error fetching server time
        return true;
      }
    } catch (error) {
      console.error("Error fetching server time from your API:", error);
      // Default to true if there's an error fetching server time
      return true;
    }
  }
  return true;
}
