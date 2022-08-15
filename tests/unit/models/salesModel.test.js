const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

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
