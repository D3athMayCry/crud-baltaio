'use strict';

const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try{
        const data = await repository.get();
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao carregar os produtos!'
        });
    }
}

exports.post = async(req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'});

    }catch(e){
        res.status(500).send({
            erro: e,
            message: 'Falha ao cadastrar o pedido!'
        });
    }
};