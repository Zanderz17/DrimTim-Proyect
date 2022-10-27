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
// Get all solicitud-cotizacion with a pending state
router.get('/compras-nacionales/solicitud-compra/aceptar-documento/pendiente', (req, res) => {
    SolicitudCompra
        .find( {estado: 'pendiente'} )
        .select(['-_id', 'nro_solicitud_compra', 'fecha_elaboracion'])
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// Updating state of a solicitud-cotizacion to acepted
router.put('/compras-nacionales/solicitud-compra/aceptar-documento/aceptado', (req, res) => {
    const { nroSolicitud } = req.query;
    const { state } = req.body;
    SolicitudCompra
        .findOneAndUpdate({nro_solicitud_compra: nroSolicitud}, {estado: state})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    /*
    SolicitudCompra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    */
});

// UPDATE a task
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
});

module.exports = router;