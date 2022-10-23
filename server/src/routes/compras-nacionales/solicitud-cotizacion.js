const express = require('express');
const router = express.Router();
const SolicitudCotizacion = require('../../models/SolicitudCotizacion');

router.post('/compras-nacionales/solicitud-cotizacion', async (req, res) => {
    const solicitud_cotizacion = SolicitudCotizacion(req.body);
    await solicitud_cotizacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;