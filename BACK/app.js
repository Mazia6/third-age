const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const app = express();

const patientRoutes = require('./api/routes/patients');
const relativesRoutes = require('./api/routes/relatives');
const medicalRecordsRoutes = require('./api/routes/medical-records');

mongoose.connect(
    'mongodb+srv://mazia:' + process.env.MONGO_ATLAS_PW + '@thirdagedb-yp0mj.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({
        })
    }
    next();
})

// Rotas que retornam requests
app.use('/pacientes', patientRoutes);
app.use('/parentes', relativesRoutes);
app.use('/prontuarios', medicalRecordsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
