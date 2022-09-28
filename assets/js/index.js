import { dataBaseDollar, dataBaseProducts } from "./dataBase.js";

const cartLink = document.querySelector("#cartLink");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const cartModalBody = document.querySelector("#cartTbody");
const productCard = document.querySelector("#productCard");
const searchProducts = document.querySelector("#searchProducts");
const searchList = document.querySelector("#searchList");

const products = [];
let cart = [];

const addCart = (product) => {
  const exists = cart.find((item) => item.id === product.id);
  if (exists) {
    exists.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  cartCount.innerHTML = cart.length;
};

const removeCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  showCart(cart);

  cartCount.innerHTML = cart.length;
};

const showCart = () => {
  cartModalBody.innerHTML = "";
  cart.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <th>${product.quantity}</th>
        <td>${product.description}</td>
        <td>$${product.addTax()}</td>
        <td> <button type="button" class="btn btn-outline-danger" id="removeProduct${
          product.id
        }">X</button></td>
      `;
    cartModalBody.append(tr);

    const removeProduct = document.querySelector(`#removeProduct${product.id}`);
    removeProduct.addEventListener("click", () => removeCart(product.id));
  });

  const total = cart
    .reduce((acc, prod) => acc + prod.addTax() * prod.quantity, 0)
    .toFixed(2);

  cartTotal.innerHTML = `$${total}`;
};

const searchProductsByDescription = (description) => {
  return products.filter((product) =>
    product.description.includes(description)
  );
};

const renderListProducts = (keyWords) => {
  searchList.innerHTML = "";
  if (keyWords.length > 2) {
    const productsFilter = searchProductsByDescription(keyWords);

    for (const product of productsFilter) {
      let li = document.createElement("li");
      li.innerHTML = `
      <a href="#" class="list-group-item list-group-item-action" id="item-${product.id}" >
        ${product.description}       
      </a>
      `;
      searchList.append(li);

      let linkItem = document.querySelector(`#item-${product.id}`);
      linkItem.addEventListener("click", () => {
        const selectedProduct = productsFilter.find((p) => p.id === product.id);

        productCard.classList.remove("d-none");
        productCard.innerHTML = `
        <div
          class="card mb-3 p-4 border border-primary position-relative"
        >
          <button
            class="btn btn-sm btn-outline-danger position-absolute mt-2 me-2 top-0 end-0"
            id="close-${selectedProduct.id}"
          >
            x
          </button>
          <div class="row g-0">
            <div class="col-12 col-lg-6">
              <img
                src="./assets/images/products/${selectedProduct.id}-1.jpg"
                alt="..."
                class="imgCart"
              />
            </div>
            <div
              class="col-12 col-lg-6 d-flex flex-column justify-content-around"
            >
              <div class="card-body">
                <h5 class="card-title">${selectedProduct.description}</h5>
                <p class="card-text">$${selectedProduct.addTax()}</p>
                <p class="card-text">
                  <small class="text-muted"
                    >stock: ${selectedProduct.stock}</small
                  >
                </p>
              </div>

              <button
                class="btn btn-primary d-flex justify-content-center align-items-center ms-auto"
                id="add-${selectedProduct.id}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-cart-plus me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
                  />
                  <path
                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  /></svg
                >Agregar
              </button>
            </div>
          </div>
        </div>
      `;

        const addProduct = document.querySelector(`#add-${selectedProduct.id}`);
        addProduct.addEventListener("click", () => {
          addCart(selectedProduct);
        });

        const close = document.querySelector(`#close-${selectedProduct.id}`);
        close.addEventListener("click", (e) => {
          productCard.innerHTML = "";
          productCard.classList.add("d-none");
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            productCard.innerHTML = "";
            productCard.classList.add("d-none");
          }
        });
      });
    }
  }
};

class Product {
  constructor(product, dollar) {
    this.id = product.id;
    this.description = product.description;
    this.brand = product.brand;
    this.category = product.category;
    this.price = product.price * dollar;
    this.stock = product.stock;
    this.quantity = 0;
  }
  addTax() {
    return (this.price * 1.105).toFixed(2);
  }
}

for (const product of dataBaseProducts) {
  products.push(new Product(product, dataBaseDollar));
}

searchProducts.addEventListener("input", (e) => {
  const keyWords = e.target.value.toUpperCase();

  renderListProducts(keyWords);
});

cartLink.addEventListener("click", () => showCart());
