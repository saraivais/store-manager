const Joi = require('joi');
const runSchema = require('./schemaValidation');
const productsModel = require('../models/productsModel');

const productsService = {
  getAll: async () => {
    const result = await productsModel.getAll();

    return result;
  },

  exists: async (id) => {
    const result = await productsModel.exists(id);

    return result;
  },

  getById: async ({ id }) => {
    const exists = await productsModel.exists(id);
    if (!exists) {
      throw new Error('404|Product not found');
    }
    const [chosenProduct] = await productsModel.getById(id);
    return chosenProduct;
  },

  validateProductName: runSchema(Joi.object({
    name: Joi.string().required().min(5).messages({
      'string.min': '422|"name" length must be at least 5 characters long',
      'any.required': '400|"name" is required',
    }),
  })),

  create: async (productToCreate) => {
    const verifiedName = await productsService.validateProductName(productToCreate);
    const creationResult = await productsModel.create(verifiedName);
    return {
      ...verifiedName,
      ...creationResult,
    };
  },

  edit: async () => { },
  
};

module.exports = productsService;
