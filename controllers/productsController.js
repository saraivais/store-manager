const productsService = require('../services/productsService');

const productsController = {
  
  getAll: async (_request, response, _next) => {
    const result = await productsService.getAll();
    return response.status(200).json(result);
  },

  getById: async (request, response, _next) => {
    const result = await productsService.getById(request.params);
    return response.status(200).json(result);
  },

  create: async (request, response, _next) => {
    const createResult = await productsService.create(request.body);
    return response.status(201).json(createResult);
  },

  edit: async (request, response, _next) => {
    const result = await productsService.edit(request.params, request.body);
    return response.status(200).json(result);
  },

  delete: async (request, response, _next) => {
    await productsService.delete(request.params);
    return response.status(204).end();
  },

  searchByName: async (request, response, _next) => {
    const result = await productsService.searchByName(request.query);
    return response.status(200).json(result);
  },

};

module.exports = productsController;
