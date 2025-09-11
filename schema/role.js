const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: { type: String },
}, { timestamps: true })

module.exports = Schema;
