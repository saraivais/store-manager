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
    
  });

  describe('#Service - validate sale/product object', () => {
    describe('When quantity is not valid', () => {

      it('Throws an error "400|\'quantity\' is required" when there is no quantity', async () => {
        return expect(salesService.validateProductSaleObject({ productId: 1 })).to.eventually.be.rejectedWith(Error, '400|"quantity" is required');
        
      });

      it('Throws an error "400|\'quantity\' is required" when quantity is empty', async () => {
        return expect(salesService.validateProductSaleObject({ productId: 1, quantity: '' })).to.eventually.be.rejectedWith(Error, '400|"quantity" is required');
      });

      it('Throws error "422|\'quantity\' must be greater than or equal to 1" when quantity is equal or lower than 0', async () => {
        return expect(salesService.validateProductSaleObject({ productId: 1, quantity: 0 })).to.eventually.be.rejectedWith(Error, '400|"quantity" must be greater than or equal to 1');
      });

    });

    describe('When productId is not valid', () => {

      it('Throws an error "400|\'productId\' is required" when there is no productId', async () => {
        return expect(salesService.validateProductSaleObject({ quantity: 2 })).to.eventually.be.rejectedWith(Error, '400|"productId" is required');
      });

      it('Throws an error "400|\'productId\' is required" when productId is empty', async () => {
        return expect(salesService.validateProductSaleObject({ quantity: 2, productId: '' })).to.eventually.be.rejectedWith(Error, '400|"productId" is required');
      });

    });

    describe('When all fields are valid', () => {

      it('Returns an object', async () => {
        const result = await salesService.validateProductSaleObject({ productId: 1, quantity: 10 });
        
        expect(result).to.be.an('object');
      });

      it('Returns the same object as received', async () => {
        const result = await salesService.validateProductSaleObject({ productId: 1, quantity: 10 });

        expect(result).to.be.eql({ productId: 1, quantity: 10 });
      });

    });
  });
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