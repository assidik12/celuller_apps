const db = require("../configs/database");

exports.fetchTansactions = async (email) => {
  const query = await db.query("SELECT * FROM transactions " + "JOIN transactions_details ON transactions.no_order = transactions_details.no_order " + "LEFT JOIN kode_vocher ON transactions_details.id_product = kode_vocher.id_product");
  console.log(query);

  const values = Object.keys(query).map((key) => {
    if (query[key].status == "true") {
      if (!query.error) {
        // insert into tranasactions detail
        let listTransactions = [],
          // fetching to ui
          listDetail = [],
          lastPush = "";

        for (let index in query) {
          if (lastPush !== query[index].no_order) {
            for (let i in query) {
              if (query[i].no_order === query[index].no_order) {
                listDetail.push({
                  productName: query[i].productName,
                  harga: query[i].harga,
                  kode: query[i].kode,
                  quantity: query[i].quantyty,
                  chek: query[i].status,
                });
              }
            }

            for (let i in listDetail) {
              if (listDetail[i].chek === "true") {
                const reChangeVocher = db.query("UPDATE kode_vocher SET status = ? WHERE kode = ?", ["false", listDetail[i].kode]);
                return reChangeVocher;
              } else {
                console.log("tidak");
              }
            }

            listTransactions.push({
              no_order: query[index].no_order,
              date: query[index].tanggal,
              email: query[index].email,
              total_price: query[index].total_price,
              products: listDetail,
            });
            lastPush = query[index].no_order;
          }
        }

        return { listTransactions };
      }
    }
  });
  return values;
};

exports.addTransactions = async (order, products, email) => {
  try {
    const query = await db.query("INSERT INTO transactions SET ?", [order]);

    if (!query.error) {
      const transaction_detail = [];
      const product_id = [];

      products.map((product) => {
        transaction_detail.push([order.no_order, product.id, email, product.quantity]);
        product_id.push([product.id]);
      });
      const updateDetailStock = await addDetailTransaction(transaction_detail, product_id);
      if (updateDetailStock) {
        return db.query("SELECT * FROM transactions WHERE no_order = ?", [order.no_order]);
      }
      return updateDetailStock;
    }
  } catch (err) {
    console.log(err);
  }
};

// // 👇 internal function 👇

async function addDetailTransaction(transaction_detail, product_id) {
  const query = await db.query("INSERT INTO transactions_details( no_order, id_product, email, quantity) VALUES ?", [transaction_detail]);

  if (!query.error) {
    return updateStock(transaction_detail, product_id);
  }
}
async function updateStock(transaction_detail, product_id) {
  try {
    const query = await db.query("SELECT stok FROM products WHERE id IN (?)", [product_id]);
    if (!query.error && query.length === product_id.length) {
      const update_stock = [];

      query.map((res, i) => {
        update_stock.push([transaction_detail[i][1], res.stok - transaction_detail[i][3]]);
      });

      const update = await db.query("INSERT INTO products (id,stok) VALUES ? ON DUPLICATE KEY UPDATE stok = VALUES(stok)", [update_stock]);

      return update;
    }
  } catch (error) {
    console.log(error);
  }
}
