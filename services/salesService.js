const Joi = require('joi');
const runSchema = require('./schemaValidation');
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
  
  validateProductSaleObject: runSchema(Joi.object({
    productId: Joi.number().required().empty('')
      .messages({
        'any.required': '400|"productId" is required',
        'any.empty': '400|"productId" is required',
      }),
    quantity: Joi.number().required().empty('').min(1)
      .messages({
        'any.required': '400|"quantity" is required',
        'any.empty': '400|"quantity" is required',
        'number.min': '422|"quantity" must be greater than or equal to 1',
      }),
  })),
};

module.exports = salesService;
