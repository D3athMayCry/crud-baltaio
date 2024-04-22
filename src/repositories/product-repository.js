'use strict';

const Product = require('../models/product'); // Adjust the path according to your project structure

// Funcoes de CRUD
exports.get = async () => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
}

// Get by slug
exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
    return res;
}

// Get by id
exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res; // You missed returning the result here
}

// Get by tag
exports.getByTag = async (tag) => {
    const res = await Product.find({
        tags: tag,
        active: true
    }, 'title description price slug tags');
    return res;
}

// Create Product
exports.create = async (data) => {
    let product = new Product(data);
    await product.save();
}

// Update product by Id
exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
}

// Delete product By Id
exports.delete = async (id) => {
    await Product.findByIdAndRemove(id);
}
