const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Relative = require('../models/relative')

router.get('/', (req, res, next) => {
    Relative.find()
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

router.get('/:relativeId', (req, res, next) => {
    const id = req.params.relativeId;
    Relative.findById(id)
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
    const relative = new Relative({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        identify: req.body.identify,
        genre: req.body.genre,
        relativeLevel: req.body.relativeLevel,
        number: req.body.number,
        email: req.body.number,
        patientId: req.param.patientId
    });
    relative
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /relatives',
                createdRelative: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:relativeId', (req, res, next) => {
    const id = req.params.relativeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Relative.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

router.delete('/:relativeId', (req, res, next) => {
    const id = req.params.relativeId;
    Relative.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

module.exports = router;
