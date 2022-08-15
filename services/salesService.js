const Joi = require('joi');
const runSchema = require('./schemaValidation');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

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

  create: async (productsToCreate) => {
    const validatedProducts = productsToCreate
      .map((newProduct) => salesService.validateProductSaleObject(newProduct));
    const allProductsExistence = await Promise.all(validatedProducts
      .map(({ productId }) => productsModel.exists(productId)));
    if (allProductsExistence.some((exists) => exists === false)) {
      throw new Error('400|Product not found');
    }
    const createdSale = await salesModel.create(validatedProducts);
    return createdSale;
  },

  delete: async ({ id }) => {
    const saleExists = await salesModel.exists(id);
    if (!saleExists) {
      throw new Error('404|Sale not found');
    }
    const result = await salesModel.delete(id);
    return (!!result.affectedRows);
  },
};

module.exports = salesService;
