'use strict';
const Validation = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// GET
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
// GET BY SLUG
exports.getBySlug = async(req, res, next) => {
    try{
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao carregar o produto!'
        });
    }
}
// GET BY ID
exports.getById = async(req, res, next) => {
    try{
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao carregar o produto!'
        });
    }
}
// GET BY TAG
exports.getByTag = async(req, res, next) => {
    try{
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao carregar o produto!'
        });
    }
}
// POST
exports.post = async(req, res, next) => {
    let validador = new Validation();

    validador.hasMinLen(req.body.title, 3, 'O tiúlo deve ter pelo menos 3 caracteres');
    validador.hasMinLen(req.body.description, 3, 'A descrição deve ter pelo menos 3 caracteres');
    validador.hasMinLen(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres');
    validador.hasMinLen(req.body.price, 1, 'O preço deve ser maior que 0');

    // Se os dados forem inválidos, retornar o erro
    if(!validador.isValid()){
        res.status(400).send(validador.errors()).end();
        return;
    }

    try{
        const data = await repository.create(req.body);
        res.status(201).send({
            message: 'Produto criado com sucesso!'});
    }catch(e){
        res.status(500).send({
            message: 'Falha ao criar o produto!'
        });
    }
};
// PUT
exports.put = async(req, res, next) => {
    try{
        const data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao atualizar o produto!'
        });
    }
};
// DELETE
exports.delete = async(req, res, next) => {
    try{
        const data = await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao remover o produto!'
        });
    }
};
