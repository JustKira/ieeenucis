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

// Example usage
const originalDate = new Date(); // Current date
const convertedDate = convertDateFormat(originalDate);
console.log(convertedDate);
