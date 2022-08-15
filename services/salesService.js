// const Joi = require('joi');
// const runSchema = require('./schemaValidation');
const salesModel = require('../models/salesModel');

const salesService = {
  getAll: async () => {
    const result = await salesModel.getAll();

    return result;
  },

  getById: async ({ id }) => {
    const idExists = await salesModel.exists(id);
    if (!idExists) {
      throw new Error('404|Sale not found');
    }
    const saleById = await salesModel.getById(id);
    return saleById;
  },

};

module.exports = salesService;
