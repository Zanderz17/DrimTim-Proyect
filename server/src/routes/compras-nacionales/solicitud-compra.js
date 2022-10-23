const express = require('express');
const router = express.Router();
const SolicitudCompra = require('../../models/SolicitudCompra');

router.post('/compras-nacionales/solicitud-compra', async (req, res) => {
    const solicitud_compra = SolicitudCompra(req.body);
    console.log(solicitud_compra);
    
    await solicitud_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    
});

module.exports = router;