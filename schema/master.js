const mongoose = require('mongoose');

const field = {
    default: { type: String },
    dataType: { type: String },
    columnName: { type: String },
    enum: [{ type: String }],
}

const Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        status: { type: Boolean, default: true },
        fields: [field],
    },
    { timestamps: true }
);

module.exports = Schema;
