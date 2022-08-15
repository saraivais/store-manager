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
};

module.exports = salesModel;
