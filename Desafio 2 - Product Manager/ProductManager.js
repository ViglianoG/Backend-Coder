const fs = require("fs");

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.format = "utf-8";
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const id = this.getNextID();
    const newCode = () => {
      const newCode = Math.random();
      const sameCode = this.products.some(
        (product) => product.code === newCode
      );
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
      code: code == "" || code == undefined || code == null ? newCode() : code,
      stock:
        stock == null || stock == undefined
          ? "Falta especificar el stock"
          : stock,
    };
    return this.getProducts().then((products) => {
      products
        .push(product)
        .then((productsNew) =>
          fs.promises.writeFile(this.filename, JSON.stringify(productsNew))
        );
    });
  };
  getProducts = async () => {
    return fs.promises
      .readFile(this.filename, this.format)
      .then((content) => JSON.parse(content))
      .catch((error) => {
        console.log("ERROR", error);
        return [];
      });
  };

  getNextID = () => {
    const count = this.getProducts().length;
    console.log(count);
    if (count > 0) {
      const lastproduct = this.getProducts()[count - 1];
      const id = lastproduct.id + 1;
      return id;
    } else {
      return 1;
    }
  };

  getProductByID = (productID) => {
    const product = this.products.find((product) => product.id == productID);
    if (product == undefined) {
      console.log("Not Found");
    } else {
      console.log(product);
    }
  };
}

async function run() {
  const manager = new ProductManager("products.json");
  await manager.addProduct(
    "Producto de prueba 1",
    "Descripción del producto de prueba",
    150,
    "sin imagen",
    "codigo123",
    10
  );
  console.log(await manager.getProducts());
}

run();

// const productManager = new ProductManager();
// console.log("✓-----------------------");

// console.log(productManager.getProducts());

// productManager.addProduct(
//   "Producto de prueba 1",
//   "Descripción del producto de prueba",
//   150,
//   "sin imagen",
//   "codigo123",
//   10
// );

// console.log("✓-----------------------");

// console.log(productManager.getProducts());

// productManager.addProduct("Producto de prueba 2", "", 10, "", "", 20);

// console.log("✓-----------------------");

// console.log(productManager.getProducts());

// console.log("✓-----------------------");

// productManager.getProductByID(5);

// console.log("✓-----------------------");

// productManager.addProduct(); // producto sin especificar ningun campo
// productManager.getProductByID(3);
