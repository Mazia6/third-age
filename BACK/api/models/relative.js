const mongoose = require('mongoose');

const relativeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    identify: String,
    genre: String,
    relativeLevel: String,
    number: String,
    email: String,
    patientId: String
});

module.exports = mongoose.model('Relative', relativeSchema);
