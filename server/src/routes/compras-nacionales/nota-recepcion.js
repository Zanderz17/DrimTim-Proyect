const express = require('express');
const router = express.Router();
const NotaRecepcion = require('../../models/NotaRecepcion');

router.post('/compras-nacionales/nota-recepcion', async (req, res) => {
    const nota_recepcion = NotaRecepcion(req.body);
    await nota_recepcion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;