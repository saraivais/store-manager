const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Tests salesController', () => {
  describe('Get all sales', () => {
    before(async () => {
      const getAllReturn = [
        {
          saleId: 1,
          date: '2022-08-15 12:23:53',
          productId: 1,
          quantity: 5,
        },
        {
          saleId: 1,
          date: '2022-08-15 12:23:53',
          productId: 2,
          quantity: 10,
        },
        {
          saleId: 2,
          date: '2022-08-15 12:23:53',
          productId: 3,
          quantity: 15,
        },
      ];

      sinon.stub(salesService, 'getAll').resolves(getAllReturn);
    });

    after(async () => {
      salesService.getAll.restore();
    });

    it('Returns status code 200', async () => {
      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('Returns an array of objects as JSON', async () => {
      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await salesController.getAll(request, response);

      expect(response.json.calledWith([
        {
          saleId: 1,
          date: '2022-08-15 12:23:53',
          productId: 1,
          quantity: 5,
        },
        {
          saleId: 1,
          date: '2022-08-15 12:23:53',
          productId: 2,
          quantity: 10,
        },
        {
          saleId: 2,
          date: '2022-08-15 12:23:53',
          productId: 3,
          quantity: 15,
        },
      ])).to.be.true;
    });

  });

  
});