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

describe('Get product by Id', () => {
  describe('When the id exists', () => {
    beforeEach(async () => {
      const getByIdResult = {
        id: 1,
        name: "Martelo do Thor",
      };

    sinon.stub(productsService, 'getById').resolves(getByIdResult);
  });

    afterEach(async () => {
      productsService.getById.restore();
    });

    it('Returns an object as JSON', async () => {
      const request = {};
      const response = {};
      request.params = { id: '1' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productsController.getById(request, response);

      expect(response.json.calledWith({ id: 1, name: 'Martelo do Thor' })).to.be.true;
    });

    it('Returns status code 200', async () => {
      const request = {};
      const response = {};
      request.params = { id: '1' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

  });
});

describe('Creates one product', () => {
  describe('When the product "name" is valid', () => {
    before(async () => {
      const createResult = {
        id: 9,
        name: 'Hawkeye\'s Bow',
      };

    sinon.stub(productsService, 'create').resolves(createResult);
    });

    after(async () => {
      productsService.create.restore();
    });

    it('Returns created object as JSON', async () => {
      const request = {};
      const response = {};
      request.body = { name: 'Hawkeye\'s Bow' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productsController.create(request, response);

      expect(response.json.calledWith({ id: 9, name: 'Hawkeye\'s Bow' })).to.be.true;
    });

    it('Returns status code 201', async () => {
      const request = {};
      const response = {};
      request.body = { name: 'Hawkeye\'s Bow' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });

  });
});

describe('Edits a product', () => {
  describe('When the product exists and the "name" is valid', () => {
    before(async () => {
      const idExists = true;
      const validatedName = { name: 'Martelo do Batman' };
      const editResult = {
        id: 1,
        name: 'Martelo do Batman',
      };

      sinon.stub(productsService, 'exists').resolves(idExists);
      sinon.stub(productsService, 'validateProductName').resolves(validatedName);
      sinon.stub(productsService, 'edit').resolves(editResult);

    });

    after(async () => {
      productsService.exists.restore();
      productsService.validateProductName.restore();
      productsService.edit.restore();
    });

    it('Returns the edited object as JSON', async () => {
      const request = {};
      const response = {};
      request.params = { id: 1 }
      request.body = { name: 'Martelo do Batman' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      expect(response.json.calledWith({ id: 1, name: 'Martelo do Batman' })).to.be.true;
    });

    it('Returns status code 200', async () => {
      const request = {};
      const response = {};
      request.params = { id: 1 }
      request.body = { name: 'Martelo do Batman' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      expect(response.status.calledWith(200)).to.be.true;
    });
    
  });
});

// describe('Deletes a product', () => {

// });

// describe('Search products by name', () => {

// });
