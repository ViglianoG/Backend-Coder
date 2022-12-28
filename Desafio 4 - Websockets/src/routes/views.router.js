import express from "express";
import ProductManager from "../ProductManager.js";
import io from "../app.js";

const router = express.Router();
const productManager = new ProductManager("products.json");

//VER PRODUCTOS AGREGADOS ANTERIOREMENTE
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products, style: "index.css" });
});

//VER PROD EN TIEMPO REAL
router.get("/realtimeproducts", async (req, res) => {
  let products = await productManager.getProducts();
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado.");

    socket.on("addProduct", async (data) => {
      const productAdded = await productManager.addProduct(data);
      products.push(productAdded);
      io.emit("showProducts", products);
    });

    socket.on("deleteProduct", async (data) => {
      let products = await productManager.getProducts();
      await productManager.deleteProduct(data.id);

      const filtered = products.filter((prod) => prod.id != data.id);
      io.emit("showProducts", filtered);
    });
  });
  res.render("realTimeProducts", { products, style: "index.css" });
});

//AGREGAR PROD
router.post("/realtimeproducts", async (req, res) => {
  let products = await productManager.getProducts();

  const product = req.body;
  const addedProduct = await productManager.addProduct(product);
  products.push(addedProduct);

  res.json({ status: "Success", addedProduct });
  io.emit("showProducts", products);
});

//ELIMINAR PROD
router.delete("/realtimeproducts/:pid", async (req, res) => {
  const pID = req.params.pid;
  await productManager.deleteProduct(pID);
  const products = await productManager.getProducts();

  res.send({ status: "Success", message: "Product deleted..." });
  io.emit("showProducts", products);
});

export default router;
