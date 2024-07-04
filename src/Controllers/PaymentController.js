const midtransClient = require("midtrans-client");
const crypto = require("crypto");

const GetTransactionToken = (req, res) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MT_SERVER_KEY,
  });

  let parameter = {
    transaction_details: {
      order_id: crypto.randomUUID(),
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };

  snap.createTransaction(parameter).then((transaction) => {
    let transactionToken = transaction.token;
    return res.status(200).json({ transactionToken });
  });
};

module.exports = GetTransactionToken;
