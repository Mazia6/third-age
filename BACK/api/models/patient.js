const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    identify: String,
    bornDate: String,
    genre: String,
    job: String,
    school: String,
    laterality: String,
    nationality: String,
    primaryContact: String,
    hospitalizationDate: String
});

module.exports = mongoose.model('Patient', patientSchema);