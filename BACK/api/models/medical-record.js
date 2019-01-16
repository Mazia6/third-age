const mongoose = require('mongoose');

const medicalRecordchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId: Number,
    room: Number,
    humor: String,
    restrictions: String,
    medicines: String,
    smoker: String,
    alcoholic: String,
    observation: String
});

module.exports = mongoose.model('medicalRecord', medicalRecordchema);