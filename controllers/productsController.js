const productsService = require('../services/productsService');

const productsController = {
  
  getAll: async (request, response) => {
    const result = await productsService.getAll();

    return response.status(200).json(result);
  },

};

module.exports = productsController;
