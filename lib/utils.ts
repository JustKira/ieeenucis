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

export function hasDatePassed(inputDateString?: string): boolean {
  // Get the current UTC time
  if (inputDateString) {
    const inputDate = new Date(inputDateString);
    const currentDate = new Date();
    const currentUTC = new Date(currentDate.toISOString());

    // Convert the input date to UTC
    const inputUTC = new Date(inputDate.toISOString());

    // Compare the input date with the current UTC time
    return inputUTC < currentUTC;
  }
  return true;
}
