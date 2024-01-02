const mongoose = require('../config/connection');



const userSchema = new mongoose.Schema({
    fname: { type: String, required: true, },
    emailID: { type: String, required: true, unique: true },
    rollNo: { type: Number, required: true, },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

