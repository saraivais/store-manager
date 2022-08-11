const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
                       
// coisinho só pra não bugar
const productsModel = {
  getAll: async () => {

  },
  getById: async () => {

  },
}

// teste do getAll()
describe('Get all products', () => {

  describe('When it receives no parameters', () => {

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

    it('returns an array of objects with "id" and "name" keys', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.an('array').that.contains.something.like({ id: 1, name: 'testing' });
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

  describe('', () => {});

});