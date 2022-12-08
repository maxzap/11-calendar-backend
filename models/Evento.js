const { Schema, model, SchemaType } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
        // TODO: Falta check con el Express Validator.
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { //Me va a servir para hacer validaciones 
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //El nombre del esquema al que estoy haciendo referencia.
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);