const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function(){
    // const { __v, _id, password, ...Object } = this.toObject();
    const { __v, _id, ...Object } = this.toObject();
    // Object.uid = _id;
    return Object
})

module.exports = model('Mensaje', MensajeSchema);