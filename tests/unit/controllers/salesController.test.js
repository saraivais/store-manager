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

  describe('Get sale by id', () => {
    describe('When the id exists', () => {
      before(async () => {
        const getByIdResult = [
          {
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2,
          },
          {
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2,
          },
        ];

        sinon.stub(salesService, 'getById').resolves(getByIdResult);
      });

      after(async () => {
        salesService.getById.restore();
      });

      it('Returns status code 200', async () => { 
        const request = {};
        const response = {};
        request.params = { id: '1' };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        await salesController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('Returns an array of objects as JSON', async () => {
        const request = {};
        const response = {};
        request.params = { id: '1' };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        await salesController.getById(request, response);

        expect(response.json.calledWith([
          {
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2,
          },
          {
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2,
          },
        ])).to.be.true;
      });
    });
  });

  describe('Create sale', () => {
    describe('When the insertion parameters are valid', () => {
      before(async () => {
        const createResult = {
          id: 10,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 }
          ],
        };
        
        sinon.stub(salesService, 'create').resolves(createResult);
      });

      after(async () => {
        salesService.create.restore();
      });

      it('Returns status code 201', async () => {
        const request = {};
        const response = {};
        request.body = [
          {
            "productId": 1,
            "quantity": 1,
          },
          {
            "productId": 2,
            "quantity": 2,
          }
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        await salesController.create(request, response);

        expect(response.status.calledWith(201)).to.be.true;
      });
      
      it('Returns an object as JSON', async () => {
        const request = {};
        const response = {};
        request.body = [
          {
            "productId": 1,
            "quantity": 1,
          },
          {
            "productId": 2,
            "quantity": 2,
          }
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        await salesController.create(request, response);

        expect(response.json.calledWith({
          id: 10,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 }
          ],
        })).to.be.true;
      });

    });
  });

});