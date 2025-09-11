const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = Schema;
