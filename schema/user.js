const mongoose = require('mongoose')

const moduleSchema = {
    label: { type: String },
    path: { type: String },
}
const Schema = new mongoose.Schema({
    email: { type: String },
    modules: [moduleSchema],
    domain: { type: String },
    password: { type: String },
    lastName: { type: String },
    firstName: { type: String },
    companyName: { type: String },
    phoneNumber: { type: String },
    description: { type: String },
    isHierarchy: { type: Boolean },
    isCreatedDatabase: { type: Boolean, default: false },
    status: { type: String, default: "PENDING", enum: ["PENDING"] },
    role: [{ type: String, enum: ["SUPER_ADMIN", "ADMIN", "SYSTEM_ADMIN"] }],
    activeRole: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "SYSTEM_ADMIN"] },
    price: { type: Number},
}, { timestamps: true })

module.exports = Schema;
