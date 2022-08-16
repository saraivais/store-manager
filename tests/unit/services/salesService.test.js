const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');

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

      it('Throws error "422|\'quantity\' must be greater than or equal to 1" when quantity is equal or lower than 1', async () => {
        return expect(salesService.validateProductSaleObject({ productId: 1, quantity: 0 })).to.eventually.be.rejectedWith(Error, '422|"quantity" must be greater than or equal to 1');
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

  describe('#Service - Create a sale', () => {
    describe('When any productId does not exist', () => {
      beforeEach(async () => {
        sinon.stub(productsModel, 'exists')
          .onCall(0).resolves(true)
          .onCall(1).resolves(false)
          .onCall(2).resolves(true);
      });

      afterEach(async () => {
        productsModel.exists.restore();
      });

      it('Throws an error "404|Product not found"', async () => {
        const invalidData = [
          { productId: 1, quantity: 10 },
          { productId: 74, quantity: 1 },
          { productId: 2, quantity: 2 },
        ];

        return expect(salesService.create(invalidData)).to.eventually.be.rejectedWith(Error, '404|Product not found');
      });
    });

    describe('When all values are valid', () => {
      before(async () => {
        const createdSale = {
          id: 10,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 }
          ],
        };
      
        sinon.stub(productsModel, 'exists').resolves(true);
        sinon.stub(salesModel, 'create').resolves(createdSale);
      });

      after(async () => {
        productsModel.exists.restore();
        salesModel.create.restore();
      });

      it('Returns an object', async () => {
        const result = await salesService.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);

        expect(result).to.be.an('object');
      });
      
      it('The object has "id" and "itemsSold" as keys', async () => {
        const result = await salesService.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);

        expect(result).to.have.all.keys('id', 'itemsSold');
      });

      it('"itemsSold" key is an array', async () => {
        const result = await salesService.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);

        expect(result.itemsSold).to.be.an('array')
      });

      it('Returns the expected values', async () => {
        const result = await salesService.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);

        expect(result).to.be.eql({
          id: 10,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 }
          ],
        });
      });

    });
  });

  describe('#Service - Deletes a sale', () => {
    describe('When the sale id does not exist', () => {
      before(async () => {
        sinon.stub(salesModel, 'exists').resolves(false);
      });

      after(async () => {
        salesModel.exists.restore();
      });

      it('Throws an error "404|Sale not found"', async () => {
        return expect(salesService.delete({ id: 101 })).to.eventually.be.rejectedWith(Error, '404|Sale not found');
      });
    });

    describe('When the sale id exists', () => {
      before(async () => {
        sinon.stub(salesModel, 'exists').resolves(true);
        sinon.stub(salesModel, 'delete').resolves({ affectedRows: 1 });

      });

      after(async () => {
        salesModel.exists.restore();
        salesModel.delete.restore();
      });

      it('Returns a boolean indicating that has deleted the sale', async () => {
        const result = await salesService.delete({ id: 1 });

        expect(result).to.be.a('boolean');
      });

      it('The value is true', async () => {
        const result = await salesService.delete({ id: 1 });

        expect(result).to.be.true;
      });

    });
  });

  describe('#Service - Edits products', () => {
    describe('When the sale does not exist', () => {
      before(async () => {
        sinon.stub(salesModel, 'exists').resolves(false);
      });
      
      after(async () => {
        salesModel.exists.restore();
      });

      it('Throws an error "404|Sale not found', async () => {
        return expect(salesService.edit(999, [])).to.eventually.be.rejectedWith(Error, '404|Sale not found');
      });
    });

    describe('When the sale exists', () => {
      before(async () => {
        sinon.stub(salesModel, 'exists').resolves(true);
        sinon.stub(salesModel, 'edit').resolves({
          saleId: 1,
          itemsUpdated: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 50 },
          ]
        });
      });

      after(async () => {
        salesModel.exists.restore();
        salesModel.edit.restore();
      });

      it('Returns an object', async () => {
        const result = await salesService.edit({ id: 1 }, [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ]);

        expect(result).to.be.an('object');
      });

      it('The object has "saleId" and "itemsUpdated" as keys', async () => {
        const result = await salesService.edit({ id: 1 }, [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ]);

        expect(result).to.have.all.keys('saleId', 'itemsUpdated');
      });

      it('The object has the expected values', async () => {
        const result = await salesService.edit({ id: 1 }, [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ]);
        
        expect(result).to.be.eql({
          saleId: 1,
          itemsUpdated: [
            { productId: 1, quantity: 10 },
            { productId: 2, quantity: 50 },
          ]
        });
       });
    });
  });

});

/*
{
  id: 10,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 }
  ],
}
*/