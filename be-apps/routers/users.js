const express = require("express");
const user = express.Router();
const response = require("../helpers/response");
const { fetchCarts, newUsers, getUsersLogin } = require("../controler/users");

user.route("/carts").get(async (req, res) => {
  try {
    const result = await fetchCarts(req.body);
    response.success(result, "users carts", res);
  } catch (error) {
    response.error({ error: error.message }, req.originalUrl, 403, res);
  }
});

user.route("/register").post(async (req, res) => {
  try {
    const result = await newUsers(req.body);
    response.success(result, "users register", res);
  } catch (error) {
    response.error({ error: error.message }, req.originalUrl, 403, res);
  }
});

user.route("/login").post(async (req, res) => {
  try {
    const result = await getUsersLogin(req.body);
    response.successLogin(result, "users login", res);
  } catch (error) {
    response.error({ error: error.message }, req.originalUrl, 403, res);
  }
});

module.exports = user;
