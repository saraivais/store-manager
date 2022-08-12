const productsModel = require('../models/productsModel');

const productsService = {
  getAll: async () => {
    const result = await productsModel.getAll();

    return result;
  },

  // exists: async () => { },

  // getById: async () => { },
  
};

module.exports = productsService;
