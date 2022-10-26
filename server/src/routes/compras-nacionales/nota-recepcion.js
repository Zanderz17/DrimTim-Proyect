const express = require('express');
const router = express.Router();
const NotaRecepcion = require('../../models/NotaRecepcion');

/* Nuevo documento */
router.post('/compras-nacionales/nota-recepcion', async (req, res) => {
    const nota_recepcion = NotaRecepcion(req.body);
    await nota_recepcion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Aceptar documento */
// Get all solicitud-cotizacion by its state
router.get('/compras-nacionales/nota-recepcion/:state', (req, res) => {
    const { state } = req.params;
    NotaRecepcion
        .find({state: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;