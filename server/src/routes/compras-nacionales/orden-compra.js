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
// Get all solicitud-cotizacion by its state
router.get('/compras-nacionales/orden-compra/:state', (req, res) => {
    const { state } = req.params;
    OrdenCompra
        .find({state: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;