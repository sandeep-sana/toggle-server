const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: { type: String },
    blocks: [{ type: Object }],
}, { timestamps: true })

module.exports = Schema;
