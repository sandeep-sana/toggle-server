const mongoose = require('mongoose');

const field = {
    ref: { type: String },
    min: { type: String },
    max: { type: String },
    unique: { type: String },
    enum: [{ type: String }],
    dataType: { type: String },
    columnName: { type: String },
    validation: [{type: String}],
    default: { type: mongoose.Schema.Types.Mixed },
}

const Schema = new mongoose.Schema(
    {
        fields: [field],
        name: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = Schema;
