const db = require("../configs/database");

// di gunakan unutuk query user costumer
exports.fetchProductsAll = async () => {
  const query = db.query("SELECT * FROM products");
  return query;
};

exports.fetchProducts = async (url) => {
  const query = db.query(`SELECT * FROM products WHERE productName = '${url}'`);
  return query;
};

// ini di gunakan untuk admin dashboard

exports.addProducts = async (data) => {
  try {
    const { productName, harga, stok, deskripsi, kode_vocher } = data;
    const query = await db.query("INSERT INTO products (productName, harga, stok, deskripsi) VALUES (?, ?, ?, ?)", [productName, harga, stok, deskripsi]);
    let id = query.insertId;
    for (let i in kode_vocher) {
      await db.query("INSERT INTO kode_vocher (id_product, kode, status) VALUES (?, ?, ?) ", [id, kode_vocher[i].kode, "true"]);
    }
    return query;
  } catch (error) {
    return error;
  }
};

exports.updateProducts = async (data) => {
  try {
    const { id, productName, harga, deskripsi, img, stock } = data;
    const query = await db.query(
      `UPDATE products
    SET
      productName = CASE WHEN '${productName}' IS NOT NULL THEN '${productName}' ELSE productName END,
      deskripsi = CASE WHEN '${deskripsi}' IS NOT NULL THEN '${deskripsi}' ELSE deskripsi END,
      harga = CASE WHEN ${harga} IS NOT NULL THEN ${harga} ELSE harga END,
      img = CASE WHEN '${img}' IS NOT NULL THEN '${img}' ELSE img END,
      kode_vocher = CASE WHEN '${stock}' IS NOT NULL THEN '${stock}' ELSE stock END
    WHERE id = ${id}`
    );
    return query;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProducts = async (id) => {
  const query = await db.query(`DELETE FROM products WHERE id = '${id}'`);
  return query;
};
