const express = require('express');
const router = express.Router();
const OrdenCompra = require('../../models/OrdenCompra');

router.post('/compras-nacionales/orden-compra', async (req, res) => {
    const orden_compra = OrdenCompra(req.body);
    await orden_compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;