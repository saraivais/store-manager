const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Get all products', () => {
  before( async () => {
    const getAll = [
      {
        id: 1,
        name: "Martelo do Thor",
      },
      {
        id: 2,
        name: "Traje do encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      }
    ];

    sinon.stub(productsModel, 'getAll').resolves(getAll);
  });

  after( async () => {
    productsModel.getAll.restore();
  });

  it('Returns an array with all products', async () => {
    const result = await productsService.getAll();

    expect(result).to.be.an('array');
  });
});

// describe('Exists', () => { });

// describe('Get product by Id', () => { });

// describe('', () => { });

// describe('', () => { });

// describe('', () => { });