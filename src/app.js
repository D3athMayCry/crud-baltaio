const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const index = require('./routes/index');
const productRoutes = require('./routes/product-route');
const customerRoutes = require('./routes/customer-route');
const orderRoutes = require('./routes/order-route');
const config = require('./config');

mongoose.connect(config.connectionString);
const Product = require('./models/product'); // Esta linha importa o modelo Product
const Customer = require('./models/customer'); // Esta linha importa o modelo Customer
const Order = require('./models/order'); // Esta linha importa o modelo Order

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));


// Habilita o CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', index);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
