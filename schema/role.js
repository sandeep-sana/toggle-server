const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        status: { type: Boolean, default: true },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = Schema;
