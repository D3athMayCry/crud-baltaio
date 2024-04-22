'use strict'

const mongoose = require('mongoose'); // Correção da importação
const Schema = mongoose.Schema;

const schema = new Schema({
    // Aqui ele vai criar um _id automaticamente
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number:{
        type: String,
        required: [true, 'Numero e obrigatorio'], // true,
    },
    createDate:{
        type: Date,
        required: [true, 'Data e obrigatorio'],
        default: Date.now
    },
    status:{
        type: String,
        required: [true, 'Satatus e obrigatorio'],
        enum: ['Created', 'done'],
        default: 'Created'
    },

    items:[{
        quantity:{
            type: Number,
            required: [true, 'Quantidade e obrigatorio'],
            default: 1
        },
        price:{
            type: Number,
            required: [true, 'Preço e obrigatorio'],
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }],
});

module.exports = mongoose.model('Order', schema);
