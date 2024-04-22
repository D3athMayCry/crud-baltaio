'use strict';

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');


exports.post = async(req, res, next) => {
    let validador = new validationContract();

    validador.hasMinLen(req.body.name, 3, 'O Nome deve ter pelo menos 3 caracteres');
    validador.isEmail(req.body.email, 'E-mail invalido!');
    validador.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 8 caracteres');

    // Se os dados forem inválidos, retornar o erro
    if(!validador.isValid()){
        res.status(400).send(validador.errors()).end();
        return;
    }

    try{
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'});
    }catch(e){
        res.status(500).send({
            data: e,
            message: 'Falha ao cadastrar o cliente!'
        });
    }
};

exports.authenticate = async(req, res, next) => {
    try{
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer){
            res.status(404).send({
                message: 'Usuário ou senha inválidos!'
             });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
           token: token,
           data: {
               email: customer.email,
               name: customer.name
           }
        });

    }catch(e){
        res.status(500).send({
            data: e,
            message: 'Falha ao autenticar o cliente!'
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(404).send({
                message: 'Cliente não encontrado!'
             });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
           token: token,
           data: {
               email: customer.email,
               name: customer.name
           }
        });

    }catch(e){
        res.status(500).send({
            data: e,
            message: 'Falha ao autenticar o cliente!'
        });
    }
};