const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordCompraSchema = new Schema({
    nro_orden_compra: {
        type: String,
        required: true
    },
    nro_sol_cotizacion: {
        type: String,
        required: true
    },
    fecha_elaboracion: {
        type: String,
        required: true
    },
    fecha_entrega_mercancias: {
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
                cant_requerida: {
                    type: String,
                    required: true
                },
                precio_unitario: {
                    type: String,
                    required: true
                },
                importe_parcial: {
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
    impuesto: {
        type: String,
        required: true
    },
    importe_total: {
        type: String,
        required: true
    },
    transporte: {
        type: String,
        required: true
    },
    costo_trasnporte: {
        type: String,
        required: true
    },
    fraccion_aduanal: {
        type: String,
        required: true
    },
    costo_total: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('importaciones-orden-compra', ordCompraSchema);