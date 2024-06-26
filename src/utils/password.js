const bcrypt = require("bcrypt");

const hashPassword = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const comparePassword = async (plainText, hashed) => {
  const result = await bcrypt.compare(plainText, hashed);
  return result;
};

module.exports = { hashPassword, comparePassword };
