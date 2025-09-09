const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    domain: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    company: {
        name: { type: String },
        email: { type: String },
        password: { type: String },
    },
    status: { type: String, default: "PENDING", enum: ["PENDING"] },
    role: { type: String, default: "ADMIN", enum: ["SUPER_ADMIN", "ADMIN"] },
    discription: { type: String },
})

module.exports = mongoose.model('super-admin', Schema);
