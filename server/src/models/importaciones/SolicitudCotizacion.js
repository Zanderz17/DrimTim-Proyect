const mongoose = require('mongoose');
const { Schema } = mongoose;

const solCotizacionSchema = new Schema({
    nro_solicitud_cotizacion: {
        type: String,
        required: true
    },
    nro_solicitud_compra: {
        type: String,
        required: true
    },
    fecha_elaboracion: {
        type: String,
        required: true
    },
    fecha_lim_respuesta: {
        type: String,
        required: true
    },
    nombre_proveedor: {
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
                }
            })
        ],
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    plazo_max_entrega: {
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

module.exports = mongoose.model('importaciones-solicitud-cotizacion', solCotizacionSchema);