const midtransClient = require("midtrans-client");
const crypto = require("crypto");
const Payment = require("../db/models/payment");

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

const DetailPayment = async (req, res) => {
  try {
    return res
      .status(200)
      .render("detail-payment", {
        layout: "layouts/main",
        title: "Payment Detail",
        user: req.user,
        path: req.path,
      });
  } catch (error) {
    console.log(error);
  }
};

const TransactionNotification = async (req, res) => {
  try {
    let apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MT_SERVER_KEY,
      clientKey: process.env.MT_CLIENT_KEY,
    });

    apiClient.transaction.notification(notificationJson).then((statusResponse) => {
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      let paymentType = statusResponse.payment_type;
      let transactionTime = statusResponse.transaction_time;
      let statusCode = statusResponse.status_code;
      let grossAmount = statusResponse.gross_amount;

      const hash = crypto
        .createHash("sha512")
        .update(`${orderId}${statusCode}${grossAmount}${process.env.MT_SERVER_KEY}`);

      if (statusResponse.signature_key !== hash) {
        return {
          status: "error",
          message: "Invalid Signature key",
        };
      }

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      // Sample transactionStatus handling logic

      if (transactionStatus == "capture") {
        if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          Payment.create({
            transaction_id: orderId,
            booking_id: 2,
            total_amount: grossAmount,
            status: transactionStatus,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          return res.status(200).json({ status: "success", message: "OK" });
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        return res.status(200).json({ status: "success", message: "OK" });
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetTransactionToken, TransactionNotification, DetailPayment };
