const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const PaymentSchema = new mongoose.Schema({
  applicantId: String,
  invoice_code: String,
  sender_invoice_no: { type: String, unique: true },
  invoice_receiver_code: String,
  invoice_description: String,
  sender_branch_code: String,
  amount: Number,
  result: Boolean,
  response: Object,
  callback_url: String,
});
PaymentSchema.plugin(timestamp);
PaymentSchema.plugin(uniqueValidator);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
