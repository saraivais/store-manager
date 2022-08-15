const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

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