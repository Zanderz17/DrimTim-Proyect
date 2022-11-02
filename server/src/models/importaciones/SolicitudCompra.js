const mongoose = require('mongoose');
const { Schema } = mongoose;

const solCompraSchema = new Schema({
    nro_solicitud_compra: {
        type: String,
        required: true
    },
    fecha_elaboracion: {
        type: String,
        required: true
    },
    productos: {
        type: [
            new Schema({
                id_material: {
                    type: String,
                    required: true
                },
                cant_requerida: {
                    type: String,
                    required: true
                }
            })
        ],
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    punto_pedido: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('importaciones-solicitud-compra', solCompraSchema);