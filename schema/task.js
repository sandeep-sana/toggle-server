const mongoose = require('mongoose');

const task = {
    name: { type: String },
    path: { type: String },
    status: { type: Boolean, default: true },
    accessMoveToActive: { type: String },
}
const Schema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId },
        tasks: [task],
    },
    { timestamps: true }
);

module.exports = Schema;
