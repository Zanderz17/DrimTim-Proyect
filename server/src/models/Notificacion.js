const mongoose = require('mongoose');
const { Schema } = mongoose;

const Notificacion = new Schema({
    nro_notificacion: {
        type: String,
        required: true
    },
    id_producto: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    prioridad: {
        type: String,
        required: true
    },
    agregado: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('notificacion', Notificacion);