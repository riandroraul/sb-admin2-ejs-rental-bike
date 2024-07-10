const midtransClient = require("midtrans-client");

const crypto = require("crypto");
const Payment = require("../db/models/payment");
const Booking = require("../db/models/booking");
const User = require("../db/models/user");
const Bicycle = require("../db/models/bicycle");
var QRCode = require("qrcode");
const formatDate = require("../utils/formatDate");
const formatIDR = require("../utils/formatIDR");

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
    const { booking_id } = req.params;
    const data = await Booking.findOne({
      where: { booking_id },
      raw: true,
      include: [
        { model: User, as: "user" },
        { model: Bicycle, as: "bicycle" },
      ],
    });
    const url = `${req.protocol}://${req.get("host")}/confirm/${booking_id}`;
    const generateQR = await QRCode.toFile("public/assets/img/qrcode.png", url, {
      width: 200,
    });
    const dataPayment = await Payment.findOne({
      where: { booking_id },
      raw: true,
    });

    const formatBookingDate = formatDate(data.booking_date, true);
    const formatTotalAmountToIDR = formatIDR(data.total_amount, false);
    const newData = { ...data, formatBookingDate, formatTotalAmountToIDR };
    console.log(dataPayment);
    return res.status(200).render("detail-payment", {
      layout: "layouts/main",
      title: "Payment Detail",
      user: req.user,
      path: req.path,
      data: newData,
      payment: dataPayment,
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
        .update(
          `${orderId}${statusCode}${grossAmount}${process.env.MT_SERVER_KEY}`
        );

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

// admin
const GetPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ raw: true });
    return res.status(200).render("admin/payments", {
      layout: "layouts/main",
      title: "Rental Bike | Payments",
      path: req.path,
      user: req.user,
      data: payments,
    });
  } catch (error) {
    console.log(error);
  }
};

const ConfirmPayment = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const payment = await Payment.findOne({ where: { booking_id }, raw: true });
    return res.status(200).render("admin/confirm-payment", {
      layout: "layouts/main",
      title: "Rental Bike | Confirm Payment",
      path: "/payments",
      user: req.user,
      data: payment,
      formData: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};

const UpdatePayment = async (req, res) => {
  try {
    const { status, payment_date, booking_id } = req.body;
    const updated = await Payment.update(
      { payment_date, status },
      { where: { booking_id } }
    );
    console.log({ updated });
    req.flash("errors", [
      { success: true, msg: "Successfully, Payment Updated!" },
    ]);
    return res.redirect("/payments");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetTransactionToken,
  TransactionNotification,
  DetailPayment,
  GetPayments,
  ConfirmPayment,
  UpdatePayment,
};
