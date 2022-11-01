const express = require('express');
const router = express.Router();
const SolicitudCompra = require('../../models/SolicitudCompra');

/* Nuevo documento */
router.post('/importaciones/solicitud-compra/nuevo-documento', async (req, res) => {
    const solicitud_compra = SolicitudCompra(req.body);
    console.log(solicitud_compra);
    
    await solicitud_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    
});

/* Aceptar documento */
// Get all solicitud-compra with a pending state
router.get('/importaciones/solicitud-compra/aceptar-documento/pendiente', (req, res) => {
    SolicitudCompra
        .find( {estado: 'pendiente'} )
        .select(['-_id', 'nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of solicitud-compra to accepted
router.put('/importaciones/solicitud-compra/aceptar-documento/aceptado', (req, res) => {
    const  { nroSolicitudCompra }  = req.query;
    const  { state } = req.body;
    SolicitudCompra
        .findOneAndUpdate({nro_solicitud_compra: nroSolicitudCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of solicitud-compra to rejected
router.put('/importaciones/solicitud-compra/aceptar-documento/rechazado', (req, res) => {
    const  { nroSolicitudCompra }  = req.query;
    const  { state } = req.body;
    SolicitudCompra
        .findOneAndUpdate({nro_solicitud_compra: nroSolicitudCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Historial de documento */
// Get all solicitud-compra
router.get('/importaciones/solicitud-compra/historial-documento', (req, res) => {
    SolicitudCompra
        .find()
        .select(['-_id', 'nro_solicitud_compra', 'fecha_elaboracion', 'estado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;