const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.products ORDER BY id ASC;',
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

  exists: async (id) => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id=?;',
      [id],
    );

    return (result.length !== 0);
   },

  delete: async (id) => {
    const [result] = await connection.execute(
      'DELETE FROM StoreManager.products WHERE id=?;',
      [id],
    );

    return result;
  },

  searchByName: async (string) => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE name LIKE %?%;',
      [string],
    );

    return result;
  },
};

module.exports = productsModel;