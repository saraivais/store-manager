const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Tests salesService', () => {
  describe('#Service - Get all sales', () => {
    before(async () => { 
      const execute = [
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
  
      sinon.stub(salesModel, 'getAll').resolves(execute);
    });
  
    after(async () => {
      salesModel.getAll.restore();
    });
  
    it('Returns an array', async () => {
      const result = await salesService.getAll();
  
      expect(result).to.be.an('array');
    });
  
    it('The array has the expected values', async () => {
      const result = await salesService.getAll();
  
      expect(result).to.be.eql([
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
      ]);
    });
  
  });

  describe('#Service - Get sale by Id', () => {

    describe('When the id exists', () => {
      before(async () => {
        const exists = true;
        const saleById = [
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

        sinon.stub(salesModel, 'exists').resolves(exists);
        sinon.stub(salesModel, 'getById').resolves(saleById);
      });

      after(async () => {
        salesModel.exists.restore();
        salesModel.getById.restore();

      });

      it('Returns an array', async () => {
        const result = await salesService.getById({ id: 1 });

        expect(result).to.be.an('array');
      });

      it('The objects have keys "date", "productId" and "quantity"', async () => {
        const result = await salesService.getById({ id: 1 });

        expect(result[0]).to.have.all.keys('date', 'productId', 'quantity');
        expect(result[1]).to.have.all.keys('date', 'productId', 'quantity');
      });

      it('The array has the expected values', async () => {
        const result = await salesService.getById({ id: 1 });

        expect(result).to.be.eql([
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
        ]);
      });
    });

    describe('When the id does not exist', () => {
      before(async () => {
        const exists = false;
        const saleById = [];

        sinon.stub(salesModel, 'exists').resolves(exists);
        sinon.stub(salesModel, 'getById').resolves(saleById);
      });

      after(async () => {
        salesModel.exists.restore();
        salesModel.getById.restore();
      });

      it('Throws an error "404|Sale not found"', async () => {
        return expect(salesService.getById({ id: 999 })).to.eventually.be.rejectedWith(Error, '404|Sale not found');
      });
    });
    
  })

});

/*
  [
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
  ]
*/