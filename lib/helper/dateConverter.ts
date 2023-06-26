export function convertDateFormat(date: Date | number): string {
  const dateObj = typeof date === "number" ? new Date(date) : date;
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
  const year = dateObj.getFullYear();

  // Pad single digits with leading zeros if needed
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function convertTime(timeStr: string): string {
  // Parse the input string into a Date object
  const dateTime = new Date(timeStr);

  // Extract the day, month, and year from the Date object
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Note: Months are zero-based
  const year = dateTime.getFullYear();

  // Format the date as "DD-MM-YYYY"
  const formattedTime = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;

  return formattedTime;
}
