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
// Get all solicitud-cotizacion with a pending state
router.get('/compras-nacionales/orden-compra/aceptar-documento/:state', (req, res) => {
    const { state } = req.params;
    OrdenCompra
        .find({estado: state})
        .select(['nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;