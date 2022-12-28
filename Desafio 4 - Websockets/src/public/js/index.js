const socket = io();

//get form product
const prodTitle = document.getElementById("title");
const prodDescription = document.getElementById("description");
const prodPrice = document.getElementById("price");
const prodCode = document.getElementById("code");
const prodStock = document.getElementById("stock");
const prodCategory = document.getElementById("category");
const addBtn = document.getElementById("addBtn");

//delete form product
const delID = document.getElementById("deleteID");
const delBtn = document.getElementById("deleteBtn");

const prodDOM = document.getElementById("products");

addBtn.onclick = (e) => {
  e.preventDefault();
  const title = prodTitle.value;
  const description = prodDescription.value;
  const price = prodPrice.value;
  const code = prodCode.value;
  const stock = prodStock.value;
  const category = prodCategory.value;

  if (
    title.length > 0 &&
    description.length > 0 &&
    price.length > 0 &&
    code.length > 0 &&
    stock.length > 0 &&
    category.length > 0
  ) {
    socket.emit("addProduct", {
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: [],
    });
  }
};

delBtn.onclick = (e) => {
  e.preventDefault();
  socket.emit("deleteProduct", { id: delID.value });
};

socket.on("showProducts", (data) => {
  let products = "";
  data.forEach((product) => {
    products += `<div>
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <h4>$ ${product.price}</h4>
                    <h5>Stock disponible: ${product.stock}</h5>
                    <hr>
                </div>`;
  });
  prodDOM.innerHTML = products;
});
