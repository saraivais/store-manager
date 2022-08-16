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
        'number.min': '422|"quantity" must be greater than or equal to 1',
      }),
  })),

  create: async (productsToCreate) => {
    const validatedProducts = await Promise.all(productsToCreate
      .map((newProduct) => salesService.validateProductSaleObject(newProduct)));
    const allProductsExistence = await Promise.all(validatedProducts
      .map(({ productId }) => productsModel.exists(productId)));
    if (allProductsExistence
      .some((productExistence) => productExistence === false)
    ) {
      throw new Error('404|Product not found');
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

  edit: async ({ id }, newProducts) => {
    const saleExists = await salesModel.exists(id);
    if (!saleExists) throw new Error('404|Sale not found');
    const validatedProducts = await Promise
      .all(newProducts.map((product) => salesService.validateProductSaleObject(product)));
    const allProductsExistence = await Promise.all(validatedProducts
      .map(({ productId }) => productsModel.exists(productId)));
    if (allProductsExistence
      .some((productExistence) => productExistence === false)
    ) {
      throw new Error('404|Product not found');
    }
    const result = await salesModel.edit(id, validatedProducts);
    return result;
  },
};

module.exports = salesService;
