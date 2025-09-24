const mongoose = require('mongoose')

const moduleSchema = {
    label: { type: String},
    value: { type: String},
    path: { type: String},
}
const Schema = new mongoose.Schema({
    email: { type: String },
    domain: { type: String },
    password: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    firstName: { type: String },
    discription: { type: String },
    isCreatedDatabase: { type: Boolean, default: false },
    role: { type: String, enum: ["SUPER-ADMIN", "ADMIN", "SYSTEM-ADMIN"] },
    status: { type: String, default: "PENDING", enum: ["PENDING"] },
    modules: [moduleSchema],
    isHierarchy: { type: Boolean },
    layout: { type: Object },
}, { timestamps: true })

module.exports = Schema;
