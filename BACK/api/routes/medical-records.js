const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const medicalRecord = require('../models/medical-record')

router.get('/', (req, res, next) => {
    medicalRecord.find()
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

router.post('/', (req, res, next) => {
    const record = new medicalRecord({
        _id: new mongoose.Types.ObjectId(),
        patientId: req.params.patientId,
        room: req.body.room,
        humor: req.body.humor,
        restrictions: req.body.restrictions,
        medicines: req.body.medicines,
        smoker: req.body.smoker,
        alcoholic: req.body.alcoholic,
        observation: req.body.observation
    })
    record
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /records',
                createdRecord: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:recordId', (req, res, next) => {
    const id = req.params.recordId;
    medicalRecord.findById(id)
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
})

router.patch('/:recordId', (req, res, next) => {
    const id = req.params.recordId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    medicalRecord.update({ _id: id }, {$set: updateOps})
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

router.delete('/:recordId', (req, res, next) => {
    const id = req.params.recordId;
    medicalRecord.remove({ _id: id })
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