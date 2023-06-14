const axios = require("axios");
const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const Payment = require("../../models/Payment");
const QpayToken = require("../../models/QpayToken");

var token;

// Create invoice
router.post("/createinvoice", async (req, res, next) => {
  const payer = req.body;
  token = await QpayToken.findOne();
  if (!token) {
    try {
      token = await getToken();
      await QpayToken.updateOne({}, token, { upsert: true });
    } catch (error) {
      res.json(error);
      return next(error);
    }
  }
  // ehleed token date shalgah
  let dateNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  let dateExpiry = moment.unix(token.expires_in).format("YYYY-MM-DD HH:mm:ss");
  if (dateNow > dateExpiry) {
    console.log(dateNow, dateExpiry);
    try {
      token = await getToken();
      await QpayToken.updateOne({}, token, { upsert: true });
    } catch (error) {
      res.json(error);
      return next(error);
    }
  }
  let payment_id = Date.now();
  let requestBody = {
    invoice_code: "CITY_UNIVER_INVOICE",
    sender_invoice_no: payment_id.toString(),
    invoice_receiver_code: payer.registration,
    invoice_description:
      payer.firstName +
      " " +
      payer.middleName +
      " " +
      payer.registration +
      " " +
      payer.phone1 +
      " " +
      "Бүртгэлийн хураамж",
    sender_branch_code: "WEB",
    amount: payer.amount,
    callback_url: `https://citi.edu.mn/payments?payment_id=${payment_id}`,
  };

  const url = "https://merchant.qpay.mn/v2/invoice";
  const authHeader = `Bearer ${token.access_token}`;
  axios
    .post(url, requestBody, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    })
    .then(async (response) => {
      // Handle response
      // console.log(response.data);
      requestBody.response = response.data;
      requestBody.applicantId = payer.applicantId;

      let newQpay = new Payment(requestBody);
      newQpay
        .save()
        .then((resp) => {
          console.log(resp);
          response.data.mongoId = resp._id;
          res.json(response.data);
          next();
        })
        .catch((errr) => {
          res.json(errr);
          return next(errr);
        });
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      res.json(error);
      return next(error);
    });
});

// Check payment status
router.post("/checkPaymentStatus", async (req, res, next) => {
  const payment_id = req.body;
  // console.log(payment_id);
  token = await QpayToken.findOne();
  if (!token) {
    try {
      token = await getToken();
      await QpayToken.updateOne({}, token, { upsert: true });
    } catch (error) {
      res.json(error);
      return next(error);
    }
  }
  // ehleed token date shalgah
  let dateNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  let dateExpiry = moment.unix(token.expires_in).format("YYYY-MM-DD HH:mm:ss");
  if (dateNow > dateExpiry) {
    console.log(dateNow, dateExpiry);
    try {
      token = await getToken();
      await QpayToken.updateOne({}, token, { upsert: true });
    } catch (error) {
      res.json(error);
      return next(error);
    }
  }
  try {
    let payment = await Payment.findOne({ _id: payment_id.mongoId });

    if (!payment.result) {
      try {
        let result = await checkAgainPaymentStatus(
          token,
          payment.response.invoice_id
        );
        if (result.count > 0) {
          if (result.paid_amount === payment.amount) {
            result.result = true;
            //update payment id
            try {
              await Payment.updateOne(
                { _id: payment_id.mongoId },
                {
                  result: true,
                }
              );
            } catch (error) {
              console.log(error, "update Payment status not succesful");
            }
          }
        }
        res.json(result);
        next();
      } catch (error) {
        console.log(error);
        res.json(error);
        return next();
      }
    } else {
      res.json(payment);
      next();
    }
  } catch (error) {
    res.json(error);
    return next(error);
  }
});

// Qpay-iin huseltiig damjuulah status update hiih callback-iin ar tal
router.get("/payments", async (req, res, next) => {
  const sender_invoice_no = req.query.payment_id;
  // Perform operations with paymentId
  Payment.updateOne(
    { sender_invoice_no },
    {
      result: true,
    }
  )
    .then((response) => {
      res.send("API endpoint for payments");
      next();
    })
    .catch((error) => {
      console.error(error);
      res.json(error);
      return next(error);
    });
});

function getToken() {
  return new Promise((resolve, reject) => {
    const url = "https://merchant.qpay.mn/v2/auth/token";
    const authHeader = "Basic Q0lUWV9VTklWRVJfRUNPTTo4ams3RTk2YQ==";
    axios
      .post(url, null, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((response) => {
        // Handle response
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        reject(error);
      });
  });
}

function checkAgainPaymentStatus(token, payment_id) {
  const authHeader = `Bearer ${token.access_token}`;
  return new Promise((resolve, reject) => {
    const url = `https://merchant.qpay.mn/v2/payment/check`;
    let requestBody = {
      object_type: "INVOICE",
      object_id: payment_id,
    };
    axios
      .post(url, requestBody, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle response
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        reject(error);
      });
  });
}

module.exports = router;
