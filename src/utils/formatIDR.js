function formatIDR(price) {
  // Convert the price to an integer, remove non-numeric characters (if needed)
  const numericPrice = parseInt(price.replace(/\D/g, ""), 10);

  // Format the number to IDR
  return "IDR " + numericPrice.toLocaleString("id-ID") + "/hour";
}

module.exports = formatIDR;
