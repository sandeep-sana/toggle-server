const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    matrixs: [{type: Object}],
}, { timestamps: true })

module.exports = Schema;
