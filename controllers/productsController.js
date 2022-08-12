const productsService = require('../services/productsService');

const productsController = {
  
  getAll: async (_request, response) => {
    const result = await productsService.getAll();

    return response.status(200).json(result);
  },

  getById: async (request, response) => {
    const result = await productsService.getById(request.params);

    return response.status(200).json(result);
  },

  create: async (request, response) => {
    const createResult = await productsService.create(request);
    return response.status(201).json(createResult);
  },

  edit: async (request, response) => {
    const id = request.params;
    const result = await productsService.edit(id, request.body);

    return response.status(200).json(result);
  },

  delete: async (request, response) => {
    await productsService.delete(request.params);

    return response.status(204).end();
  },

  searchByName: async (request, response) => {
    const result = await productsService.searchByName(request.query);
    return response.status(200).json(result);
  },

};

module.exports = productsController;
