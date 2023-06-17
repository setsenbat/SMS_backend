const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const MsalTokenSchema = new mongoose.Schema({
  authority: String,
  uniqueId: String,
  tenantId: String,
  scopes: [],
  account: Object,
  idToken: String,
  idTokenClaims: {},
  accessToken: String,
  fromCache: Boolean,
  expiresOn: String,
  correlationId: String,
  requestId: String,
  extExpiresOn: String,
  familyId: String,
  tokenType: String,
  state: String,
  cloudGraphHostName: String,
  msGraphHost: String,
  fromNativeBroker: Boolean,
});

MsalTokenSchema.plugin(timestamp);
MsalTokenSchema.plugin(uniqueValidator);

const MsalToken = mongoose.model("MsalToken", MsalTokenSchema);
module.exports = MsalToken;
