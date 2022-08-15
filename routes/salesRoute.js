const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.get('/:id', rescue(salesController.getById));
salesRoute.get('/', rescue(salesController.getAll));

module.exports = salesRoute;