const mongoose = require('mongoose');
const { Types } = mongoose;
const { ObjectId } = Types;
const rule = {
    ruleMapping: { type: String },
    inputExpression: { type: String },
    ruleRowCondition: { type: String },
    inputData: { type: String },
    outputExpression: { type: String },
}
const Schema = new mongoose.Schema(
    {
        rules: [rule],
    },
    { timestamps: true }
);

module.exports = Schema;
