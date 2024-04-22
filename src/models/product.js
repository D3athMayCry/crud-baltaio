'use strict'

const mongoose = require('mongoose'); // Correção da importação
const Schema = mongoose.Schema;

const schema = new Schema({
    // Aqui ele vai criar um _id automaticamente
    title:{
        type: String,
        required: [true, 'Titulo e obrigatorio'], // true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug e obrigatorio'], // true,
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Descrição e obrigatorio'], // true,
        index: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Preço e obrigatorio'], // true
    },
    active: {
        type: Boolean,
        required: [true, 'Status do produto e obrigatorio'], // true,
        default: true
    },
    tags: [{
        type: String,
        required: [true, 'Tags e obrigatorio'], // true
    }],
    image:{
        type: String,
        required: true,// true,
        trim: true
    },
});

module.exports = mongoose.model('Product', schema);
