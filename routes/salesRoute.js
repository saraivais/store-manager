const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.get('/:id', rescue(salesController.getById));
salesRoute.delete('/:id', rescue(salesController.delete));
salesRoute.put('/:id', rescue(salesController.edit));
salesRoute.post('/', rescue(salesController.create));
salesRoute.get('/', rescue(salesController.getAll));

module.exports = salesRoute;