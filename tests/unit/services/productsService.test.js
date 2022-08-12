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

describe('Exists', () => {

  describe('Returns true if product exists', () => {
    before( async () => {
      const boolean = true;

      sinon.stub(productsModel, 'exists').resolves(boolean);
    });

    after( async () => {
      productsModel.exists.restore();
    });

    it('Returns a boolean', async () => {
      const result = await productsService.exists({ id: 1 });

      expect(result).to.be.a('boolean');
    });

    it('The value is true', async () => {
      const result = await productsService.exists({ id: 1 });

      expect(result).to.be.true;
    });
  });

  describe('Return false if product does not exists', () => {
    before( async () => {
      const boolean = false;

      sinon.stub(productsModel, 'exists').resolves(boolean);
    });

    after( async () => {
      productsModel.exists.restore();
    });

    it('Returns a boolean', async () => {
      const result = await productsService.exists({ id: 1001 });

      expect(result).to.be.a('boolean');
    });

    it('The value is false', async () => {
      const result = await productsService.exists({ id: 1001 });

      expect(result).to.be.false;
    });
  });
});

// describe('Get product by Id', () => { });

// describe('', () => { });

// describe('', () => { });

// describe('', () => { });