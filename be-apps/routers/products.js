const express = require("express");
const response = require("../helpers/response");
const products = express.Router();
let provider = "telkomsel";

const { fetchProductsAll, addProducts, fetchProducts, updateProducts, deleteProducts } = require("../controler/products");

products.route(`/`).get(async (req, res) => {
  try {
    const result = await fetchProductsAll();
    response.success(result, "product fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});
products.route(`/provider`).get(async (req, res) => {
  provider = Object.values(req.query);

  try {
    const result = await fetchProducts(provider.toString());
    response.success(result, "product fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

products.route("/").post(async (req, res) => {
  try {
    const result = await addProducts(req.body);
    response.success(result, "product added!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});
products.route("/").put(async (req, res) => {
  try {
    const result = await updateProducts(req.body);
    response.success(result, "product updated!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});
products.route("/").delete(async (req, res) => {
  try {
    const result = await deleteProducts(req.body.id);
    response.success(result, "product deleted!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = products;
