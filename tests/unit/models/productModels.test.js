const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

// teste do getAll()
describe('Get all products', () => {
  describe('When it receives no arguments', () => {

    before( async () => {
      const execute = [[
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
      ]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after( async () => {
      connection.execute.restore();
    });

    it('returns an array of objects with "id" and "name" keys', async () => {
      const [result] = await productsModel.getAll();

      expect(result).to.be.an('object').that.have.all.keys('id', 'name');
    });

    it('has the correct values', async () => {
      const result = await productsModel.getAll();

      const expectedResult = [
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

      expect(result).to.be.eql(expectedResult);
    });
  });

});

// testes do getById()
describe('Get product by Id', () => {
  describe('When it receives as argument a valid "id"', () => {
    before( async () => {
      const execute = [[
        {
          id: 1,
          name: "Martelo do Thor",
        }
      ]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after( async () => {
      connection.execute.restore();
    });

    it('Returns an array', async () => {
      const testId = 1;
      const result = await productsModel.getById(testId);

      expect(result).to.be.an('array');
    });

    it('Has an object at position 0 with "id" and "name" keys', async () => {
      const testId = 1;
      const result = await productsModel.getById(testId);

      expect(result[0]).to.have.all.keys('id', 'name');
    });

  });

  // maybe this will not stand e_e
  describe('When it receives as argument an invalid "id"', () => {
    before( async () => {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after( async () => {
      connection.execute.restore();
    });

    it('Returns an array', async () => {
      const testId = 999;
      const result = await productsModel.getById(testId);

      expect(result).to.be.an('array');
    });

    it('The array is empty', async () => {
      const testId = 999;
      const result = await productsModel.getById(testId);

      expect(result).to.be.empty;
    });
  });
  
});

// testes do create()
describe('Creates one product', () => {
  describe('Creates and returns the correct object', () => {

    before( async () => {
      const execute = [{
          id: 4,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after( async () => {
      connection.execute.restore();
    });

    it('Returns an object', async () => {
      const result = await productsModel.create({ name: "Hawkeye's Bow" });

      expect(result).to.be.an('object');
    });

    it('With "id" key', async () => {
      const result = await productsModel.create({ name: "Hawkeye's Bow" });

      expect(result).to.have.property('id');
    });
  });
});

// testes do edit()
describe('Edits a product', () => {
  describe('', () => {
    before( async () => {
      const execute = [{ affectedRows: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });
    after( async () => {
      connection.execute.restore();
    });

    it('Edits a product and returns an object', async () => {
      const result = await productsModel.edit(1, { name: "Martelo do Magneto" });

      expect(result).to.be.an('object');
    });

    it('The returned object contains the number of affected rows', async () => {
      const result = await productsModel.edit(1, { name: "Martelo do Magneto" });

      expect(result).to.be.have.property('affectedRows');
    });
  });
});

// testes do exists()

// testes do delete()

// testes do searchByName();