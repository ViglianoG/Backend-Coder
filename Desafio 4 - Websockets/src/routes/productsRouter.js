import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager("./products.json");
const router = Router();

//GET CON QUERY LIMITS
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  const QLimit = req.query.limit;
  if (QLimit) products.splice(QLimit);
  res.json({ status: "Success", products });
});

//GET PRODUCT POR EL ID
router.get("/:pid", async (req, res) => {
  const pID = req.params.pid;
  const product = await productManager.getProductByID(pID);
  product
    ? res.json(product)
    : res.send({ status: "ERROR", error: "Product not found..." });
});

//AGREGAR PRODUCTO
router.post("/", async (req, res) => {
  const product = req.body;
  const addedProduct = await productManager.addProduct(product);
  res.json({ status: "Success", addedProduct });
});

//BORRAR PRODUCTO
router.delete("/:pid", async (req, res) => {
  const pID = req.params.pid;
  await productManager.deleteProduct(pID);
  res.send({ status: "Success", message: "Product deleted..." });
});

//MODIFICAR PRODUCTO
router.put("/:pid", async (req, res) => {
  const pID = req.params.pid;
  const updateFields = req.body;
  await productManager.updateProduct(pID, updateFields);
  res.json({ status: "Success", message: "Product updated..." });
});

export default router;
