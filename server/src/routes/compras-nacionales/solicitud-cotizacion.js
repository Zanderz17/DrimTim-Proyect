const express = require('express');
const router = express.Router();
const SolicitudCotizacion = require('../../models/compras-nacionales/SolicitudCotizacion');

/* Nuevo documento */
router.post('/compras-nacionales/solicitud-cotizacion/nuevo-documento', async (req, res) => {
    const solicitud_cotizacion = SolicitudCotizacion(req.body);
    console.log(solicitud_cotizacion);
    await solicitud_cotizacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Get id of all solicitud-cotizacion documents
router.get('/compras-nacionales/solicitud-cotizacion/get-ids', (req, res) => {
    SolicitudCotizacion
        .find()
        .select(['nro_solicitud_cotizacion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

/* Aceptar documento */
// Get all solicitud-cotizacion with a pending state
router.get('/compras-nacionales/solicitud-cotizacion/aceptar-documento/pendiente', (req, res) => {
    SolicitudCotizacion
        .find({estado: 'Pendiente'})
        .select(['-_id', 'nro_solicitud_cotizacion', 'nro_solicitud_compra', 'fecha_elaboracion'])
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

/* Historial de documento */
// Get all solicitud-cotizacion
router.get('/compras-nacionales/solicitud-cotizacion/historial-documento', (req, res) => {
    SolicitudCotizacion
        .find()
        .select(['-_id', 'nro_solicitud_cotizacion', 'nro_solicitud_compra', 'fecha_elaboracion', 'estado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Visualizar documento */
// Get one solicitud-cotizacion by nro_solicitud_cotizacion
router.get('/compras-nacionales/solicitud-cotizacion/visualizar-documento/:id', (req, res) => {
    const { id } = req.params;
    SolicitudCotizacion
        .findOne({nro_solicitud_cotizacion: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;