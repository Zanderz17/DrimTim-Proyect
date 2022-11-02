const express = require('express');
const router = express.Router();
const OrdenCompra = require('../../models/importaciones/OrdenCompra');

/* Nuevo documento */
router.post('/importaciones/orden-compra/nuevo-documento', async (req, res) => {
    const orden_compra = OrdenCompra(req.body);
    await orden_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Aceptar documento */
// Get all orden-compra with a pending state
router.get('/importaciones/orden-compra/aceptar-documento/pendiente', (req, res) => {
    OrdenCompra
        .find({estado: 'pendiente'})
        .select(['-id', 'nro_orden_compra', 'nro_solicitud_cotizacion', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of orden-compra to accepted
router.put('/importaciones/orden-compra/aceptar-documento/aceptado', (req, res) => {
    const  { nroOrdenCompra }  = req.query;
    const  { state } = req.body;
    OrdenCompra
        .findOneAndUpdate({nro_orden_compra: nroOrdenCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of orden-compra to rejected
router.put('/importaciones/orden-compra/aceptar-documento/rechazado', (req, res) => {
    const  { nroOrdenCompra }  = req.query;
    const  { state } = req.body;
    OrdenCompra
        .findOneAndUpdate({nro_orden_compra: nroOrdenCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Historial de documento */
// Get all orden-compra
router.get('/importaciones/orden-compra/historial-documento', (req, res) => {
    OrdenCompra
        .find()
        .select(['-_id', 'nro_orden_compra', 'nro_solicitud_cotizacion', 'fecha_elaboracion', 'estado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;