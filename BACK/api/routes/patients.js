const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = require('../models/patient');


router.get('/', (req, res, next) => {
    Patient.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entities found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:patientId', (req, res, next) => {
    const id = req.params.patientId;
    Patient.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'unvalid ID' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

router.post('/', (req, res, next) => {
    const patient = new Patient({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        identify: req.body.identify,
        bornDate: req.body.bornDate,
        genre: req.body.genre,
        job: req.body.job,
        school: req.body.school,
        laterality: req.body.laterality,
        nationality: req.body.nationality,
        primaryContact: req.body.primaryContact,
        hospitalizationDate: req.body.hospitalizationDate
    });
    patient
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /patients',
                createdPatient: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:patientId', (req, res, next) => {
    const id = req.params.patientId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Patient.update({ _id: id }, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

router.delete('/:patientId', (req, res, next) => {
    const id = req.params.patientId;
    Patient.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;