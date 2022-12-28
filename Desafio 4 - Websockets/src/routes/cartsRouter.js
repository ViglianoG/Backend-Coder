import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const router = Router();
const cartManager = new CartManager("./carts.json");
const productManager = new ProductManager("./products.json");

//RUTA RAIZ POST CREA UN NUEVO CARRITO
router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.json({ status: "Success", cart });
});

//LISTA LOS PRODUCTOS DEL CARRITO CON EL ID ESPECIFICADO
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = await cartManager.getProducts(cid);
  res.json({ status: "Success", products });
});

//AGREGA UN PRODUCTO O MODIFICA LA QUANTITY
router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const product = await productManager.getProductByID(pid);
  if (!product)
    res.send({ status: "ERROR", error: "No se ha encontrado el producto especificado..." });
  const updatedCart = await cartManager.addProduct(cid, pid);
  if (!updatedCart)
    res.send({ status: "ERROR", error: "No se encontró el carrito especificado..." });
  else res.send({ status: "Success", message: "Producto agregado..." });
});

export default router;
