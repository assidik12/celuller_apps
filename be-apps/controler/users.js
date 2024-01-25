const db = require("../configs/database");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { get } = require("../routers/transactions");

exports.fetchCarts = async (data) => {
  try {
    const { email } = data;
    const getUser = await db.query("SELECT * FROM users WHERE email = ? ", [email]);
    for (let i in getUser) {
      const query = await db.query(
        "SELECT * FROM transactions_details " +
          "JOIN kode_vocher ON transactions_details.id_product = kode_vocher.id_product" +
          " JOIN products ON transactions_details.id_product = products.id" +
          " JOIN transactions ON transactions_details.no_order = transactions.no_order AND transactions_details.email = ? ",
        [getUser[i].email]
      );
      if (!query.error) {
        let listTransactions = [],
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
        return { listTransactions };
      }
      return query;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.newUsers = async (data) => {
  try {
    const { username, email, password, alamat, no_telp } = data;
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(password, salt);

    // Insert the user into the database
    const query = "INSERT INTO users (email,username, alamat, no_telp, password, salt) VALUES (?, ?, ?, ?, ?, ?)";
    const result = [email, username, alamat, no_telp, hashedPassword, salt];
    const value = db.query(query, result);
    return value;
  } catch (error) {
    console.log(error);
  }
};

exports.getUsersLogin = async (user) => {
  const { password, email } = user;
  const [userData] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (userData) {
    const hashedPassword = userData.password;
    const isPasswordMatch = await bycript.compare(password, hashedPassword);

    if (isPasswordMatch) {
      const token = jwt.sign({ username: userData.username, email: userData.email, alamat: userData.alamat, no_telp: userData.no_telp }, "secret_key");
      const user = {
        username: userData.username,
        email: userData.email,
        alamat: userData.alamat,
        no_telp: userData.no_telp,
      };
      return { token };
    } else {
      return { success: false, message: "Invalid password" };
    }
  } else {
    return false;
  }
};
