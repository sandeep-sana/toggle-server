const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: { type: String },
    [{ type: String }]: { type: Object },
}, { timestamps: true })

module.exports = Schema;
