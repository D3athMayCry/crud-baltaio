'use strict';

const Order = require('../models/order');

exports.get = async(data) => {
    let res = await Order.find({}, 'number createDate status customer items').populate('customer', 'name').populate('items.product', 'title');
    return res;
}

exports.create = async(data) => {
    let order = new Order(data);
    await order.save();
}