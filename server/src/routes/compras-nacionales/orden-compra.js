const express = require('express');
const router = express.Router();
const OrdenCompra = require('../../models/OrdenCompra');

/* Nuevo documento */
router.post('/compras-nacionales/orden-compra', async (req, res) => {
    const orden_compra = OrdenCompra(req.body);
    await orden_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Aceptar documento */
// Get all orden-compra with a pending state
router.get('/compras-nacionales/orden-compra/aceptar-documento/pendiente', (req, res) => {
    OrdenCompra
        .find({estado: 'pendiente'})
        .select(['-id', 'nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of orden-compra to accepted
router.put('/compras-nacionales/orden-compra/aceptar-documento/aceptado', (req, res) => {
    const  { nroOrdenCompra }  = req.query;
    const  { state } = req.body;
    OrdenCompra
        .findOneAndUpdate({nro_orden_compra: nroOrdenCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of orden-compra to rejected
router.put('/compras-nacionales/orden-compra/aceptar-documento/rechazado', (req, res) => {
    const  { nroOrdenCompra }  = req.query;
    const  { state } = req.body;
    OrdenCompra
        .findOneAndUpdate({nro_orden_compra: nroOrdenCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;