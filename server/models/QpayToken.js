const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const QpayTokenSchema = new mongoose.Schema({
  token_type: String,
  refresh_expires_in: String,
  refresh_token: String,
  access_token: String,
  expires_in: String,
  scope: String,
  not_before_policy: String,
  session_state: String,
});

QpayTokenSchema.plugin(timestamp);
QpayTokenSchema.plugin(uniqueValidator);

const QpayToken = mongoose.model("QpayToken", QpayTokenSchema);
module.exports = QpayToken;
