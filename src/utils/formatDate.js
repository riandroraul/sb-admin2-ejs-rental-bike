// Function to format the date
function formatDate(inputDate, withDays = false) {
  // Parse the input date string
  const date = new Date(inputDate);

  // Array of month names in Indonesian
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // Extract the month and year
  const days = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format and return the result
  if (withDays) return `${days} ${month} ${year}`;

  return `${month} ${year}`;
}

module.exports = formatDate;
