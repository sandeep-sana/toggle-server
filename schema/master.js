const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        columns: { type: mongoose.Schema.Types.Mixed },
        name: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = Schema;
