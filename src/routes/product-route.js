'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

// GET
router.get('/', controller.get);
// GET BY SLUG
router.get('/:slug', controller.getBySlug);
// GET BY ID
router.get('/admin/:id', controller.getById);
// GET BY TAG
router.get('/tags/:tag', controller.getByTag);
// POST
const create = router.post('/', authService.isAdmin, controller.post);
// PUT
const put = router.put('/:id',authService.isAdmin, controller.put);
// DELETE
const del = router.delete('/:id', authService.isAdmin, controller.delete);


module.exports = router;