function formatIDR(price, perHour = true) {
  // Convert the price to an integer, remove non-numeric characters (if needed)
  const numericPrice = parseInt(price.replace(/\D/g, ""), 10);

  // Format the number to IDR
  if (!perHour) return "IDR " + numericPrice.toLocaleString("id-ID");

  return "IDR " + numericPrice.toLocaleString("id-ID") + "/hour";
}

module.exports = formatIDR;
