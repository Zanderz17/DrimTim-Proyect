const express = require('express');
const router = express.Router();
const SolicitudCompra = require('../../models/compras-nacionales/SolicitudCompra');

/* Nuevo documento */
router.post('/compras-nacionales/solicitud-compra/nuevo-documento', async (req, res) => {
    const solicitud_compra = SolicitudCompra(req.body);
    console.log(solicitud_compra);
    await solicitud_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    
});

// Get id of all solicitud-compra documents
router.get('/compras-nacionales/solicitud-compra/get-ids', (req, res) => {
    SolicitudCompra
        .find()
        .select(['nro_solicitud_compra'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

/* Aceptar documento */
// Get all solicitud-compra with a pending state
router.get('/compras-nacionales/solicitud-compra/aceptar-documento/pendiente', (req, res) => {
    SolicitudCompra
        .find( {estado: 'Pendiente'} )
        .select(['-_id', 'nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of solicitud-compra to accepted
router.put('/compras-nacionales/solicitud-compra/aceptar-documento/aceptado', (req, res) => {
    const  { nroSolicitudCompra }  = req.query;
    const  { state } = req.body;
    SolicitudCompra
        .findOneAndUpdate({nro_solicitud_compra: nroSolicitudCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of solicitud-compra to rejected
router.put('/compras-nacionales/solicitud-compra/aceptar-documento/rechazado', (req, res) => {
    const  { nroSolicitudCompra }  = req.query;
    const  { state } = req.body;
    SolicitudCompra
        .findOneAndUpdate({nro_solicitud_compra: nroSolicitudCompra}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Historial de documento */
// Get all solicitud-compra
router.get('/compras-nacionales/solicitud-compra/historial-documento', (req, res) => {
    SolicitudCompra
        .find()
        .select(['-_id', 'nro_solicitud_compra', 'fecha_elaboracion', 'estado'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/* Visualizar documento */
// Get one solicitud-compra by nro_solicitud_compra
router.get('/compras-nacionales/solicitud-compra/visualizar-documento/:id', (req, res) => {
    const { id } = req.params;
    SolicitudCompra
        .findOne({nro_solicitud_compra: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;