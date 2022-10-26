const express = require('express');
const router = express.Router();
const SolicitudCotizacion = require('../../models/SolicitudCotizacion');

/* Nuevo documento */
router.post('/compras-nacionales/solicitud-cotizacion', async (req, res) => {
    const solicitud_cotizacion = SolicitudCotizacion(req.body);
    await solicitud_cotizacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Aceptar documento */
// Get all solicitud-cotizacion by its state
router.get('/compras-nacionales/solicitud-cotizacion/:state', (req, res) => {
    const { state } = req.params;
    SolicitudCotizacion
        .find({state: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;