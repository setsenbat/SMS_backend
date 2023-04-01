const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');

const NewApplicationSchema = new mongoose.Schema({
    applicantId: { type: String, required: true }, // Lets use email?
    firstName: { type: String },
    familyName: { type: String },
    middleName: String,
    gender: String,
    regitration: String,
    address1: {
        addInfo: String,
        city: String,
        company: Object,
        country: String,
        default: Boolean,
        geolocation: [],
        province: String,
        streetAddress: String,
        unitNumber: String,
        zip: String
    },
    address2: {
        addInfo: String,
        city: String,
        company: Object,
        country: String,
        default: Boolean,
        geolocation: [],
        province: String,
        streetAddress: String,
        unitNumber: String,
        zip: String
    },
    address3: {
        addInfo: String,
        city: String,
        company: String,
        country: String,
        default: Boolean,
        geolocation: [],
        province: String,
        streetAddress: String,
        unitNumber: String,
        zip: String
    },
    phone1: String,
    phone2: String,
    referencePerson1: {
        name: String,
        phone: String,
        relation: String
    },
    referencePerson2: {
        name: String,
        phone: String,
        relation: String
    },
    program: { 
        type: String, 
        index: true
    },
    recommendations: 
    [   
        {
            education: String,
            institute: String,
            familyName: String,
            firstName: String,
            initials: String,
            letter: String,
            date: Date,
            letterBody: String,
            letterId: String,
            middleName: String,
            position: String,
            phone: String,
            address: String,
            relation: String
        }
    ],
    status: Number, // 0 - closed, 1 - open, 2 - fulfilled
    education: {
        primary: [],
        undergraduate: [],
        graduate: []
    },
    date: Date,
    tuitionFee: {
        type: String
    }
});

NewApplicationSchema.plugin(uniqueValidator);
NewApplicationSchema.plugin(timestamp);


const NewApplication = mongoose.model('NewApplication', NewApplicationSchema);
module.exports = NewApplication;