const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    email: { type: String },
    domain: { type: String },
    password: { type: String },
    lastName: { type: String },
    companyName: {type: String},
    firstName: { type: String },
    discription: { type: String },
    isCreatedDatabase: { type: Boolean, default: false },
    role: { type: String, enum: ["SUPER_ADMIN", "ADMIN"] },
    status: { type: String, default: "PENDING", enum: ["PENDING"] },
})

module.exports = Schema;
