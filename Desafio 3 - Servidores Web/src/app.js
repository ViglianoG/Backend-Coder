const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const productManager = new ProductManager("../products.json");
const port = 8080;

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const QLimit = req.query.limit;
  if (QLimit) products.splice(QLimit);

  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await productManager.getProductByID(id);

  if (product) res.send(product);
  else
    res.send({ Error: "No se encontró el producto con el id especificado..." });
});

app.listen(port, () => console.log(`Corriendo en el puerto ${port}`));
