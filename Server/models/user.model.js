const mongoose = require('mongoose');

const requiredString = { type: String, required: true };

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: requiredString,
    password: requiredString,
    gender: { type: String, default: "" },
    
});

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };