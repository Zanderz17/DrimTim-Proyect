const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');

// Getting all notification
router.get('/notificaciones', (req, res) => {
    Notificacion
        .find()
        .select(['-_id', 'nro_notificacion', 'id_producto', 'stock', 'prioridad', 'agregado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Getting all notification with an agregado state in true
router.get('/notificaciones/to-send', (req, res) => {
    Notificacion
        .find( {agregado: 'true'} )
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Getting one notification by nro_notificacion
router.get('/notificaciones/:id', (req, res) => {
    const { id } = req.params;
    Notificacion
        .findOne({nro_notificacion: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating agregado state of notification to true
router.put('/notificaciones/agregar', (req, res) => {
    const  { nroNotificacion }  = req.query;
    const  { state } = req.body;
    console.log('agregar', nroNotificacion, state);
    Notificacion
        .findOneAndUpdate({nro_notificacion: nroNotificacion}, {agregado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating agreagado state of notification to false
router.put('/notificaciones/desagregar', (req, res) => {
    const  { nroNotificacion }  = req.query;
    const  { state } = req.body;
    console.log('desagregar');
    Notificacion
        .findOneAndUpdate({nro_notificacion: nroNotificacion }, {agregado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;