const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  codeId: String,
  units: [],
  teachers: [],
  programs: [],
  classes: [],
  students: [],
});
SchoolSchema.plugin(timestamp);
SchoolSchema.plugin(uniqueValidator);

const School = mongoose.model("School", SchoolSchema);
module.exports = School;
