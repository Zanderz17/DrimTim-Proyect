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
// Get all solicitud-cotizacion with a pending state
router.get('/compras-nacionales/solicitud-cotizacion/aceptar-documento/:state', (req, res) => {
    const { state } = req.params;
    SolicitudCotizacion
        .find({estado: state})
        .select(['nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});



module.exports = router;