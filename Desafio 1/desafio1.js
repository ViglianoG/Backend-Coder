class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };
  getNextID = () => {
    const count = this.products.length;
    if (count > 0) {
      const lastproduct = this.products[count - 1];
      const id = lastproduct.id + 1;
      return id;
    } else {
      return 1;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const id = this.getNextID();
    const product = {
      id: id,
      title,
      description,
      price,
      thumbnail,
      code: code,
      stock,
    };
    if (this.products.some((product) => product.code === product.code)) {
      console.log(
        "Error, ese producto ya se encuentra en la lista de productos"
      );
    } else {
      return this.products.push(product);
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

const productManager = new ProductManager();
console.log("✓-----------------------");

console.log(productManager.getProducts());

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log("✓-----------------------");

console.log(productManager.getProducts());

console.log("✓-----------------------");

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);


console.log("✓-----------------------");

productManager.getProductByID(2);

console.log("✓-----------------------");

