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
    name: Joi.string().required().empty('').min(5)
      .messages({
        'any.required': '400|"name" is required',
        'any.empty': '400|"name" is required',
        'string.min': '422|"name" length must be at least 5 characters long',
    }),
  })),

  create: async ({ name }) => {
    const verifiedName = await productsService.validateProductName({ name });
    const creationResult = await productsModel.create(name);
    return {
      id: creationResult.insertId,
      ...verifiedName,
    };
  },

  edit: async ({ id }, { name }) => {
    const idExists = await productsService.exists(id);
    if (!idExists) throw new Error('404|Product not found');
    const validatedName = await productsService.validateProductName({ name });
    await productsModel.edit(id, validatedName);
    return { id, ...validatedName };
  },

  delete: async ({ id }) => {
    const idExists = await productsService.exists(id);
    if (!idExists) throw new Error('404|Product not found');
    const deletionResult = await productsModel.delete(id);
    return !!deletionResult.affectedRows;
  },

  searchByName: async ({ q }) => {
    const searchResult = await productsModel.searchByName(q);
    if (searchResult.length === 0) {
      const allProducts = await productsService.getAll();
      return allProducts;
    }
    return searchResult;
  },

};

module.exports = productsService;
