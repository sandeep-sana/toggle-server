const mongoose = require('mongoose');

const task = {
    name: { type: String },
    status: { type: Boolean, default: true },
}
const Schema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId },
        tasks: [task],
    },
    { timestamps: true }
);

module.exports = Schema;
