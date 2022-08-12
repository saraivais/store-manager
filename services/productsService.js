const productsModel = require('../models/productsModel');

const productsService = {
  getAll: async () => {
    const result = await productsModel.getAll();

    return result;
  },

  exists: async ({ id }) => {
    const result = await productsModel.exists(id);

    return result;
  },

  // getById: async () => { },
  
};

module.exports = productsService;
