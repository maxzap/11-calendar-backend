const { Schema, model, SchemaType } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        require: true
        // TODO: Falta check con el Express Validator.
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: { //Me va a servir para hacer validaciones 
        type: Schema.Types.ObjectId,
        ref: 'Usuario' //El nombre del esquema al que estoy haciendo referencia.
    }




});

module.exports = model('Evento', EventoSchema);