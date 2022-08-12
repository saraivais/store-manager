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
  
  validateProductName: async () => { },

};

module.exports = productsService;
