const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const ProgramSchema = new mongoose.Schema({
  programId: { type: String, unique: true, required: true },
  degree: String,
  name: String,
  text: String,
  courses: [],
  specialization: String,
  enroller: String,
  learningForm: String,
  types: String,
  totalCredit: Number,
  major: String,
  school: String,
  unit: String,
  duration: String,
  isOpen: Boolean,
  info1: String,
  info2: String,
  info3: String,
  info4: String,
  info5: String,
  pic: String
});

ProgramSchema.plugin(timestamp);
ProgramSchema.plugin(uniqueValidator);

const Program = mongoose.model("Program", ProgramSchema);
module.exports = Program;
