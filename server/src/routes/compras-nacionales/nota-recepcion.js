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
// Get all nota-recepcion with a pending state
router.get('/compras-nacionales/nota-recepcion/aceptar-documento/:state', (req, res) => {
    const { state } = req.params;
    NotaRecepcion
        .find({estado: state})
        .select(['nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;