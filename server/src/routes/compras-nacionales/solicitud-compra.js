const express = require('express');
const router = express.Router();
const SolicitudCompra = require('../../models/SolicitudCompra');

/* Nuevo documento */
router.post('/compras-nacionales/solicitud-compra', async (req, res) => {
    const solicitud_compra = SolicitudCompra(req.body);
    console.log(solicitud_compra);
    
    await solicitud_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    
});

/* Aceptar documento */
// Get all solicitud-cotizacion by its state
router.get('/compras-nacionales/solicitud-compra/:state', (req, res) => {
    const { state } = req.params;
    SolicitudCompra
        .find({state: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;