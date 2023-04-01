const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
            name: {
                type: String,
                index: true
            },
            username: {
                type: String,
                index: true
            },
            password: {
                type: String
            },
            apps: [],
            location: {
                type: String,
                index: true
            },
            school: {
                type: String,
                index: true
            },
            unit: {
                type: String,
                index: true
            },
            privilege: {
                type: Number,
                required: true
            },
            position: {
                type: String,
                index: true
            },
            menu: [],
            email: {
                type: String,
                index: true,
                required: true,
                unique: true,
                lowercase: true
            },
            phone: {
                type: String,
                index: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            initials: {
                name: String,
                surname: String,
                familyname: String
            },
            rd: {
                type: String
            },
            dob: {
                type: Date
            }
    });

UserSchema.plugin(timestamp);
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', async function(next){
    try {
        //Generate salt
        const salt = await bcrypt.genSalt(10);
        //Generate password hash
        const passwordHash = await bcrypt.hash(this.password, salt);
        //re-assign hashed pass to original pass
        this.password = passwordHash;
        next();
    } catch(error) {
        next(error);
    }
});
UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;