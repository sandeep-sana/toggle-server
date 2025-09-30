const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: { type: String },
    amount: { type: Number },
}, { timestamps: true })

module.exports = Schema;
