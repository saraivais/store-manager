const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');

const productsController = require('../../../controllers/productsController');

describe('Get all products', () => {

  beforeEach(async () => {
    const getAllResult = [
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

    sinon.stub(productsService, 'getAll').resolves(getAllResult);
  });

  afterEach(async () => {
    productsService.getAll.restore();
  })

  it('Returns an array of objects as JSON', async () => {
    const request = {};
    const response = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    await productsController.getAll(request, response);

    expect(response.json.calledWith([
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
    ])).to.be.true;
  });

  it('Returns status code 200', async () => {
    const request = {};
    const response = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    await productsController.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.true;

  });
});

// describe('Get product by Id', () => {

// });

// describe('Creates one product', () => {

// });

// describe('Edits a product', () => {

// });

// describe('Deletes a product', () => {

// });

// describe('Search products by name', () => {

// });
