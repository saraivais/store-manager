const salesService = require('../services/salesService');

const salesController = {
  getAll: async (_request, response, _next) => {
    const result = await salesService.getAll();

    return response.status(200).json(result);
  },

  getById: async (request, response, _next) => {
    const result = await salesService.getById(request.params);

    return response.status(200).json(result);
  },

  create: async (request, response, _next) => {
    const result = await salesService.create(request.body);

    return response.status(201).json(result);
  },

  delete: async (request, response, _next) => {
    await salesService.delete(request.params);

    return response.status(204).end();
  },

};

module.exports = salesController;
