const connection = require('./connection');

const salesModel = {
  getAll: async () => {
    const [result] = await connection.execute(
      `SELECT sa.id AS saleId, sa.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales AS sa
      JOIN StoreManager.sales_products AS sp
        ON sa.id = sp.sale_id;`,
    );
    console.log('result dentro do model', result);
    return result;
  },

  getById: async (id) => {
    const [result] = await connection.execute(
      `SELECT sa.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales AS sa
      INNER JOIN StoreManager.sales_products AS sp
      ON sa.id = sp.sale_id
      WHERE sa.id = ?`,
      [id],
    );

    return result;
  },

  exists: async (id) => {
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.sales WHERE id = ?',
      [id],
    );

    return (result.length !== 0);
  },

  createSale: async () => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ();',
    );

    return { id: result.insertId };
  },

  createSalesProducts: async (id, { productId, quantity }) => {
    await connection.execute(
      `INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?);`,
      [id, productId, quantity],
    );
    return {
      productId,
      quantity,
    };
  },

};

module.exports = salesModel;
