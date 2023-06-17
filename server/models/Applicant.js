const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
var uniqueValidator = require("mongoose-unique-validator");

const ApplicantSchema = new mongoose.Schema({
  appId: String,
  applicantId: String, // Title
  familyName: String, // field_1: element.familyName ? element.familyName.toString() : "",
  middleName: String, //field_2: element.middleName ? element.middleName.toString() : "",
  firstName: String, //field_3: element.firstName ? element.firstName.toString() : "",
  gender: String, //field_4: element.gender ? element.gender.toString() : "",
  registration: String, // field_5: element.registration ? element.registration.toString() : "",
  address1: {
    streetAddress: String, // field_6: element.address1 ? element.address1.streetAddress.toString() : "",
    city: String, //field_7: element.address1 ? element.address1.city.toString() : "",
    province: String, //field_8: element.address1 ? element.address1.province.toString() : "",
    country: String, // field_9: element.address1 ? element.address1.country.toString() : "",
    zip: String, //field_10: element.address1 ? element.address1.zip.toString() : "",
  },
  phone1: String, //field_11: element.phone1 ? element.phone1.toString() : "",
  phone2: String,
  referencePerson1: {
    name: String, //field_12: name + relation
    lastname: String,
    phone: String, // field_13: phone
    relation: "",
  },
  referencePerson2: {
    name: String, //field_14: name + relation
    lastname: String,
    phone: String, // field_15: phone
    relation: "",
  },
  referencePerson3: {
    name: String, //field_12: name + relation
    lastname: String,
    phone: String, // field_13: phone
    relation: "",
  },
  documents: [], //field_16: await this.attachDocuments(element),
  // "field_17": "AbiTest1",
  // "field_18": 10,
  leadSource: String, // field_19: "Website",
  fee: String, // field_20: element.status == 3 ? "Төлөгдсөн" : "",
  date: String, // field_21: moment(Date.now()).format("YYYY-MM-DD"),
  manager: String, // field_22: "Online registration",
  attachment: String, //field_23: await this.attachLinks(element),
  status: Number, //field_24: element.status ? element.status.toString() : "1",
  education: [], //field_25
  chosenProgram: Object, // field_26: element.chosenProgram ? this.$t(element.chosenProgram.text) : "",
  addInfo: String, // field_28: "",
  title: String, //field_29: element.title ? element.title : "",
  school: String, //School: element.chosenProgram ? this.getSecondPart(element.chosenProgram.school) : "",
});

ApplicantSchema.plugin(timestamp);
ApplicantSchema.plugin(uniqueValidator);

const Applicant = mongoose.model("Applicant", ApplicantSchema);
module.exports = Applicant;
