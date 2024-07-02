// Function to format the date
function formatDate(inputDate) {
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format and return the result
  return `${month} ${year}`;
}

module.exports = formatDate;
