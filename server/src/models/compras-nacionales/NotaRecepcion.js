const mongoose = require('mongoose');
const { Schema } = mongoose;

const notaRecepcionSchema = new Schema({
    nro_nota_recepcion: {
        type: String,
        required: true
    },
    nro_orden_compra: {
        type: String,
        required: true
    },
    fecha_recepcion: {
        type: String,
        required: true
    },
    fecha_elaboracion: {
        type: String,
        required: true
    },
    nombre_proveedor: {
        type: String,
        required: true
    },
    condiciones_pago: {
        type: String,
        required: true
    },
    productos: {
        type: [
            mongoose.Schema({
                id_material: {
                    type: String,
                    required: true
                },
                cant_recibida: {
                    type: String,
                    required: true
                },
                precio_unitario: {
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
    importe_total_mercancia_recibida: {
        type: String,
        required: true
    },
    nombre_receptor: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('compras-nacionales-nota-recepcion', notaRecepcionSchema);