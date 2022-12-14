const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');


describe('Tests salesModel', () => { 
  // teste do getAll()
  describe('#Model - Get all sales', () => {
    describe('When it receives no arguments', () => {
      before(async () => {
        const execute = [
          [
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
          ]
        ];
  
        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(async () => {
        connection.execute.restore();
      });
  
      it('Returns an array of objects', async () => {
        const result = await salesModel.getAll();
  
        expect(result).to.be.an('array');
      });
  
      it('The objects have "saleId", "date", "productId" and "quantity" as keys', async () => {
        const result = await salesModel.getAll();
  
        expect(result[0]).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
        expect(result[1]).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
        expect(result[2]).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
      });
  
      it('Returns the expected values', async () => {
        const result = await salesModel.getAll();
  
        expect(result).to.eql([
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
  });
  
  // teste do getById()
  describe('#Model - Get sale by Id', () => {
    describe('When it receives as argument a valid "id"', () => {
      before(async () => {
        const execute = [[
          {
            date: '2022-08-15 12:23:53',
            productId: 1,
            quantity: 5,
          },
          {
            date: '2022-08-15 12:23:53',
            productId: 2,
            quantity: 10,
          }
        ]];
  
        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(async () => {
        connection.execute.restore();
      });
  
      it('Returns an array', async () => {
        const result = await salesModel.getById(1);
  
        expect(result).to.be.an('array');
      });
  
      it('The objects have "date", "productId" and "quantity" as keys', async () => {
        const result = await salesModel.getById(1);
  
        expect(result[0]).to.have.all.keys('date', 'productId', 'quantity');
        expect(result[1]).to.have.all.keys('date', 'productId', 'quantity');
      });
  
      it('Returns the expected values', async () => {
        const result = await salesModel.getById(1);
  
        expect(result).to.be.eql([
          {
            date: '2022-08-15 12:23:53',
            productId: 1,
            quantity: 5,
          },
          {
            date: '2022-08-15 12:23:53',
            productId: 2,
            quantity: 10,
          }
        ]);
      });
  
    });
  });
  
  // teste do exists() 
  describe('#Model - Sale exists', () => {
    describe('Returns false when entry does not exists in DB', () => {
      before(async () => {
        const execute = [[]];
  
        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(async () => {
        connection.execute.restore();
      });
  
      it('Returns a boolean', async () => {
        const result = await salesModel.exists(10);
  
        expect(result).to.be.a('boolean');
      });
  
      it('The value is false', async () => {
        const result = await salesModel.exists(10);
  
        expect(result).to.be.false;
      });
  
    });
  
    describe('Returns true when entry exists in DB', () => {
      before(async () => {
        const execute = [[{ id: 1, date: '2022-08-15 12:23:53' }]];
  
        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(async () => {
        connection.execute.restore();
      });
  
      it('Returns a boolean', async () => {
        const result = await salesModel.exists(1);
  
        expect(result).to.be.a('boolean');
      });
  
      it('The value is true', async () => {
        const result = await salesModel.exists(1);
  
        expect(result).to.be.true;
      });
    });
  });
  
  // testa createSale
  describe('#Model - Creates one sale', () => {
    describe('Creates and returns the correct object', () => {
      before(async () => {
        const insertSaleExecute = [{ insertId: 1 }];
  
        sinon.stub(connection, 'execute').resolves(insertSaleExecute);
      });
  
      after(async () => {
        connection.execute.restore();
      });
  
      it('Returns an object', async () => {
        const result = await salesModel.createSale();
  
        expect(result).to.be.an('object');
      });
  
      it('The object has the inserted id as "id"', async () => {
        const result = await salesModel.createSale();
  
        expect(result).to.have.key('id');
      });
    });
  });
  
  describe('#Model - Create sales products', () => {
    describe('Creates a sale_products row and returns the created object', () => {
      before(async () => {
        const insertionResult = [{ insertId: 4 }];
  
        sinon.stub(connection, 'execute').resolves(insertionResult);
  
      });
  
      after(async () => {
        connection.execute.restore();
      });
  
      it('Returns an object', async () => {
        const result = await salesModel.createSalesProducts(10, { productId: 1, quantity: 1 });
  
        expect(result).to.be.an('object');
      });
  
      it('The object has "productId" and "quantity" as keys', async () => {
        const result = await salesModel.createSalesProducts(10, { productId: 1, quantity: 1 });
  
        expect(result).to.have.all.keys('productId', 'quantity');
      });
  
    });
  });
  
  describe('#Model - Creates sale w/ products', () => {
    describe('Creates rows in both sales and sales_products and returns the correct object', () => {
      beforeEach(async () => { 
        const insertedSaleId = { id: 10 };
        const firstProduct = { productId: 1, quantity: 1 };
        const secondProduct = { productId: 2, quantity: 2 };
        
        sinon.stub(salesModel, 'createSale').resolves(insertedSaleId);

        sinon.stub(salesModel, 'createSalesProducts')
          .onCall(0).resolves(firstProduct)
          .onCall(1).resolves(secondProduct);
      });
  
      afterEach(async () => { 
        salesModel.createSale.restore();
        salesModel.createSalesProducts.restore();
      });
  
      it('Returns an object', async () => {
        const result = await salesModel.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);
  
        expect(result).to.be.an('object');
      });
  
      it('The object has "id" and "itemsSold" as keys', async () => {
        const result = await salesModel.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);
  
        expect(result).to.have.all.keys('id', 'itemsSold');
      });
  
      it('The "itemsSold" key has an array as value', async () => {
        const result = await salesModel.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);
  
        expect(result.itemsSold).to.be.an('array');
      });
  
      it('The "itemsSold" array contains the correct objects', async () => {
        const result = await salesModel.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);
  
        expect(result.itemsSold).to.be.eql([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);
      });
  
      it('The returned object is as expected', async () => {
        const result = await salesModel.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 2 }]);
  
        expect(result).to.be.eql({
          id: 10,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 }
          ],
        });
      })
    });
  });
  
  describe('#Model - Deletes a sale', () => {
    before(async () => { 
      const execute = [{ affectedRows: 1 }];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    it('Deletes a sale and returns an object', async () => {
      const result = await salesModel.delete(1);
  
      expect(result).to.be.an('object');
    });
    
    it('The returned object contains the number of affected rows', async () => {
      const result = await salesModel.delete(1);
  
      expect(result).to.have.key('affectedRows');
    });
  
  });

  describe('#Model - Edits a sale', () => {
    describe('First it deletes all sales entries from sales_products with deleteSalesProducts', () => {
      before(async () => {
        const execute = [{ affectedRows: 2 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Returns an object', async () => {
        const result = await salesModel.deleteSalesProducts(1);

        expect(result).to.be.an('object');
      });

      it('The object contains the number of affected rows', async () => {
        const result = await salesModel.deleteSalesProducts(1);

        expect(result).to.have.key('affectedRows');
      });
    });

    describe('Then it inserts new information into sales_products', () => {
      beforeEach(async () => {
        const deleteEntries = { affectedRows: 2 };
        const firstProduct = {
          productId: 1,
          quantity: 10
        };
        const secondProduct = {
          productId: 2,
          quantity: 50
        }

        sinon.stub(salesModel, 'deleteSalesProducts').resolves(deleteEntries);
        sinon.stub(salesModel, 'createSalesProducts')
          .onCall(0).resolves(firstProduct)
          .onCall(1).resolves(secondProduct);
      });

      afterEach(async () => {
        salesModel.deleteSalesProducts.restore();
        salesModel.createSalesProducts.restore();
      });

      it('Returns an object', async () => {
        const result = await salesModel.edit(1, [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }]);

        expect(result).to.be.an('object');
      });

      it('The object contains "saleId" and "itemsUpdated" as keys', async () => {
        const result = await salesModel.edit(1, [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }]);

        expect(result).to.have.all.keys('saleId', 'itemsUpdated');
      });

      it('The object has the expected values', async () => {
        const result = await salesModel.edit(1, [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }]);

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
[
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
]

[
  {
    date: '2022-08-15 12:23:53',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2022-08-15 12:23:53',
    productId: 2,
    quantity: 10,
  }
]
*/
