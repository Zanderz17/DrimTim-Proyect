const express = require('express');
const router = express.Router();
const NotaRecepcion = require('../../models/importaciones/NotaRecepcion');

/* Nuevo documento */
router.post('/importaciones/nota-recepcion/nuevo-documento', async (req, res) => {
    const nota_recepcion = NotaRecepcion(req.body);
    await nota_recepcion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Aceptar documento */
// Get all nota-recepcion with a pending state
router.get('/importaciones/nota-recepcion/aceptar-documento/pendiente', (req, res) => {
    NotaRecepcion
        .find({estado: 'pendiente'})
        .select(['-_id', 'nro_nota_recepcion', 'nro_orden_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of nota-recepcion to accepted
router.put('/importaciones/nota-recepcion/aceptar-documento/aceptado', (req, res) => {
    const  { nroNotaRecepcion }  = req.query;
    const  { state } = req.body;
    NotaRecepcion
        .findOneAndUpdate({nro_nota_recepcion: nroNotaRecepcion}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of nota-recepcion to rejected
router.put('/importaciones/nota-recepcion/aceptar-documento/rechazado', (req, res) => {
    const  { nroNotaRecepcion }  = req.query;
    const  { state } = req.body;
    NotaRecepcion
        .findOneAndUpdate({nro_nota_recepcion: nroNotaRecepcion}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Historial de documento */
// Get all nota-recepcion
router.get('/importaciones/nota-recepcion/historial-documento', (req, res) => {
    NotaRecepcion
        .find()
        .select(['-_id', 'nro_nota_recepcion', 'nro_orden_compra', 'fecha_elaboracion', 'estado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;