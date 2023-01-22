const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');

/* Nuevo documento */
router.post('/notificaciones/nuevo-documento', async (req, res) => {
    const notificacion = Notificacion(req.body);
    console.log(notificacion);
    await notificacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Getting all notification
router.get('/notificaciones', (req, res) => {
    Notificacion
        .find()
        .select(['-_id', 'nro_notificacion', 'id_producto', 'stock', 'prioridad', 'agregado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Getting all notification with an 'agregado' state in true and selecting just 'id_producto' and 'stock' attributes
router.get('/notificaciones/to-send', (req, res) => {
    Notificacion
        .find( {agregado: 'true'} )
        .select(['-_id', 'id_producto', 'stock'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Getting one notification by 'nro_notificacion'
router.get('/notificaciones/:id', (req, res) => {
    const { id } = req.params;
    Notificacion
        .findOne({nro_notificacion: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating 'agregado' state of notification to true
router.put('/notificaciones/agregar', (req, res) => {
    const  { nroNotificacion }  = req.query;
    const  { state } = req.body;
    Notificacion
        .findOneAndUpdate({nro_notificacion: nroNotificacion}, {agregado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating 'agreagado' state of notification to false
router.put('/notificaciones/desagregar', (req, res) => {
    const  { nroNotificacion }  = req.query;
    const  { state } = req.body;
    Notificacion
        .findOneAndUpdate({nro_notificacion: nroNotificacion }, {agregado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Deleting one notification by 'nro_notificacion'
router.delete('/notificaciones/:id', (req, res) => {
    const { id } = req.params;
    Notificacion
        .findOneAndRemove({nro_notificacion: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

module.exports = router;