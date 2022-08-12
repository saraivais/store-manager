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
      const result = await productsService.exists(1);

      expect(result).to.be.a('boolean');
    });

    it('The value is true', async () => {
      const result = await productsService.exists(1);

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
      const result = await productsService.exists(1001);

      expect(result).to.be.a('boolean');
    });

    it('The value is false', async () => {
      const result = await productsService.exists(1001);

      expect(result).to.be.false;
    });
  });
});

// meesa needs help w throw~ from here on :(
describe('Get product by Id', () => {
  describe('When the id exists', () => {
    before( async () => {
      const boolean = true;
      sinon.stub(productsModel, 'exists').resolves(boolean);

      const product = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(productsModel, 'getById').resolves(product);
    });

    after( async () => {
      productsModel.exists.restore();
      productsModel.getById.restore();
    });

    it('Returns the product object', async () => {
      const result = await productsService.getById({ id: 1 });

      expect(result).to.be.an('object');
    });

    it('Returns the expected object', async () => {
      const result = await productsService.getById({ id: 1 });

      expect(result).to.be.eql({ id: 1, name: 'Martelo de Thor' });
    });
  });

  describe('When the id does not exists', () => {
    before( async () => {
      const boolean = false;
      sinon.stub(productsModel, 'exists').resolves(boolean);

      const product = [];
      sinon.stub(productsModel, 'getById').resolves(product);
    });

    after( async () => {
      productsModel.exists.restore();
      productsModel.getById.restore();
    });

    it('Throws an error "404|Product not found"', async () => {
      // expect(() => productsService.getById({ id: 999 })).to.throws('404|Product not found');
      // assert.throws(await productsService.getById({ id: 999 }), '404|Product not found');
    });
  });
});

describe('Validates product name', () => {

  describe('When "name" is valid', () => {

    it('Returns an object', async () => {
      const result = await productsService.validateProductName({ name: 'Loki\'s Scepter' });

      expect(result).to.be.an('object');
    });

    it('Returns the name given as "name" key', async () => {
      const fakeProduct = { name: 'Iron Man suit'
    };
      const result = await productsService.validateProductName(fakeProduct);

      expect(result).to.be.eql(fakeProduct);
    });
  });

  describe('When "name" is not valid', () => {

    it('Throws "400|\'name\' is required" when there is no "name" key', async () => {
      const result = await productsService.validateProductName({});

      expect(result).to.throws('400|"name" is required');
    });

    it('Throws "400|\'name\' is required" when the "name" key is empty', async () => {
      const result = await productsService.validateProductName({ name: '' });

      expect(result).to.throws('400|"name" is required');
    });

    it('Throws "422|\'name\' length must be at least 5 characters long" when "name" is too short', async () => {
      const result = await productsService.validateProductName({ name: 'Loki' });

      expect(result).to.throws('422|"name" length must be at least 5 characters long');
    });

  });

});

describe('Creates one product', () => {
  describe('Creates and returns the object with "id" and "name"', () => {
    before(async () => {
      const createdId = { id: 10 };
      const validatedName = { name: 'Black Panther\'s suit' };

      sinon.stub(productsModel, 'create').resolves(createdId);
      sinon.stub(productsService, 'validateProductName').resolves(validatedName);      
      });

    after(async () => {
      productsModel.create.restore();
      productsService.validateProductName.restore();
    });

    it('Returns an object', async () => {
      const result = await productsService.create({ name: 'Black Panther\'s suit' });

      expect(result).to.be.an('object');
    });

    it('The object contains "id" and "name" keys', async () => {
      const result = await productsService.create({ name: 'Black Panther\'s suit' });

      expect(result).to.have.all.keys('id', 'name');
    });

    it('The object is the expected one', async () => {
      const result = await productsService.create({ name: 'Black Panther\'s suit' });

      expect(result).to.be.eql({ id: 10, name: 'Black Panther\'s suit' });
    });
  });
});

describe('Edits a product', () => {

  describe('Can\'t edit if the product id does not exist', () => {
    before(async () => {
      const existsResult = false;

      sinon.stub(productsService, 'exists').resolves(existsResult);
    });

    after(async () => {
      productsService.exists.restore();
    });
    
    it('Throws an error "404|Product not found"', async () => {
      expect(() => productsService.edit(999, { name: 'Hulk\'s red shorts' })).to.throws('404|Product not found');
    });
  });

  describe('Edits and returns an object with "id" and "name"', () => {
    before(async () => {
      const existsResult = true;
      const validatedName = { name: 'Doctor Strange\'s Cloak of Levitation' };
      const modelEditResponse = { affectedRows: 1 };

      sinon.stub(productsService, 'exists').resolves(existsResult);
      sinon.stub(productsService, 'validateProductName').resolves(validatedName);
      sinon.stub(productsModel, 'edit').resolves(modelEditResponse);
    });

    after(async () => {
      productsService.exists.restore();
      productsService.validateProductName.restore();
    });

    it('Returns an object', async () => {
      const result = await productsService.edit(1, { name: 'Doctor Strange\'s Cloak of Levitation' });

      expect(result).to.be.an('object');
    });

    it('The object has "id" and "name" keys', async () => {
      const result = await productsService.edit(1, { name: 'Doctor Strange\'s Cloak of Levitation' });

      expect(result).to.have.all.keys('id', 'name');
    });

  });
});