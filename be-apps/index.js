const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const product = require("./routers/products");
const transaction = require("./routers/transactions");
const getUsers = require("./routers/users");

app.use("/product", product);
app.use("/transaction", transaction);
app.use("/users", getUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
