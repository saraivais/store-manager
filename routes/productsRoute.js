const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.get('/search', rescue(productsController.searchByName));
productsRoute.get('/:id', rescue(productsController.getById));
productsRoute.put('/:id', rescue(productsController.edit));
productsRoute.get('/', rescue(productsController.getAll));
productsRoute.post('/', rescue(productsController.create));
productsRoute.delete('/:id', rescue(productsController.delete));

module.exports = productsRoute;
