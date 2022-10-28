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
router.get('/compras-nacionales/solicitud-cotizacion/aceptar-documento/pendiente', (req, res) => {
    SolicitudCotizacion
        .find({estado: 'pendiente'})
        .select(['-_id', 'nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of solicitud-cotizacion to acsepted
router.put('/compras-nacionales/solicitud-cotizacion/aceptar-documento/aceptado', (req, res) => {
    const  { nroSolicitudCotizacion }  = req.query;
    const  { state } = req.body;
    SolicitudCotizacion
        .findOneAndUpdate({nro_solicitud_cotizacion: nroSolicitudCotizacion}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of solicitud-cotizacion to rejected
router.put('/compras-nacionales/solicitud-cotizacion/aceptar-documento/rechazado', (req, res) => {
    const  { nroSolicitudCotizacion }  = req.query;
    const  { state } = req.body;
    SolicitudCotizacion
        .findOneAndUpdate({nro_solicitud_cotizacion: nroSolicitudCotizacion}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;