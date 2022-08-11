const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.products;',
    );
    return result;
  },

  getById: async ({ id }) => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?;',
      [id],
    );
    return result;
  },

  create: async ({ name }) => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?);',
      [name],
    );

    return result;
  },

  edit: async (id, { name }) => {
    const [result] = await connection.execute(
      'UPDATE StoreManager.products SET name=? WHERE id=?;',
      [name, id],
    );
    return result;
  },

};

module.exports = productsModel;