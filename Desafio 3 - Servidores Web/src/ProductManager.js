const fs = require("fs");

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.format = "utf-8";
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const id = await this.getNextID();
    const newCode = async () => {
      const newCode = Math.random();
      const products = await this.getProducts();
      const sameCode = products.some((prod) => prod.code == newCode);
      if (sameCode == true) {
        return "Error, ese código ya se encuentra en un producto.";
      } else {
        return newCode;
      }
    };
    const product = {
      id,
      title:
        title == undefined || title == "" || title == null
          ? "Por favor especificar el titulo"
          : title,
      description:
        description == undefined || description == "" || description == null
          ? "Falta especificar la descripción del producto"
          : description,
      price: price == undefined || price == "" || price == null ? 0 : price,
      thumbnail:
        thumbnail == undefined || thumbnail == "" || thumbnail == null
          ? "Por favor especificar la ruta de la imagen"
          : thumbnail,
      code:
        code == "" || code == undefined || code == null
          ? await newCode()
          : code,
      stock:
        stock == null || stock == undefined
          ? "Falta especificar el stock"
          : stock,
    };

    return this.getProducts()
      .then((products) => {
        products.push(product);
        return products;
      })
      .then((productsNew) =>
        fs.promises.writeFile(this.filename, JSON.stringify(productsNew))
      );
  };

  getProducts = async () => {
    return fs.promises
      .readFile(this.filename, this.format)
      .then((res) => {
        if (res) {
          const products = JSON.parse(res);
          return products;
        } else return [];
      })
      .catch((error) => {
        console.log("Error: ", error);
        return [];
      });
  };

  getNextID = async () => {
    const products = await this.getProducts();
    const count = products.length;
    if (count > 0) {
      const lastproduct = products[count - 1];
      const id = lastproduct.id + 1;
      return id;
    } else {
      return 1;
    }
  };

  getProductByID = async (id) => {
    const products = await this.getProducts();
    const prodFound = products.find((product) => product.id == id);
    if (prodFound == undefined) {
      console.log("Not Found");
    } else {
      return prodFound;
    }
  };

  saveProducts = (products) => {
    const prodToString = JSON.stringify(products);
    fs.promises.writeFile(this.filename, prodToString);
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();

    const prodID = () => products.some((prod) => prod.id === id);
    if (!prodID()) return console.log("Error el producto no existe.");

    const updatedProducts = products.filter((prod) => prod.id !== id);

    this.saveProducts(updatedProducts);
  };

  updateProduct = async (id, obj) => {
    const products = await this.getProducts();
    const prodToUpdate = products.findIndex((prod) => prod.id === id);

    products[prodToUpdate] = {
      ...products[prodToUpdate],
      ...obj,
      id: id,
    };

    this.saveProducts(products);
  };
}


module.exports = ProductManager;
