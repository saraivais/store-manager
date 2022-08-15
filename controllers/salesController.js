const salesService = require('../services/salesService');

const salesController = {
  getAll: async (_request, response, _next) => {
    const result = await salesService.getAll();

    return response.status(200).json(result);
  },

};

module.exports = salesController;
