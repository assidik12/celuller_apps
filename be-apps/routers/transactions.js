const express = require("express");
const response = require("../helpers/response");
const transactions = express.Router();
const util = require("../helpers/util");

const { fetchTansactions, addTransactions } = require("../controler/transaction");

transactions.route("/").get(async (req, res) => {
  console.log(req.body.email);
  try {
    const result = await fetchTansactions(req.body.email);
    response.success(result, "transaction fatched", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

transactions.route("/").post(async (req, res) => {
  const { totalPrice, products, email } = req.body;
  let waktuSekarang = new Date();

  // Mendapatkan nilai jam, menit, dan detik
  let jam = waktuSekarang.getHours();
  let menit = waktuSekarang.getMinutes();
  let detik = waktuSekarang.getSeconds();
  let tanggal = waktuSekarang.getFullYear() + "-" + (waktuSekarang.getMonth() + 1) + "-" + waktuSekarang.getDate() + " " + jam + ":" + menit + ":" + detik;

  const order = {
    no_order: util.randomOrderNumber(), // generate order number
    total_price: totalPrice,
    tanggal,
  };
  try {
    const result = await addTransactions(order, products, email);
    response.success(result, "transasction added", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = transactions;
