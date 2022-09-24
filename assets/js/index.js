import { dataBaseDollar, dataBaseProducts } from "./dataBase.js";
import { addCart, removeCart, showCart } from "./cutomFunctions.js";

class Product {
  constructor(product, dollar) {
    this.id = product.id;
    this.description = product.description;
    this.brand = product.brand;
    this.categorie = product.categorie;
    this.price = product.price * dollar;
    this.stock = product.stock;
    this.quantity = 0;
  }
  addTax() {
    return (this.price * 1.105).toFixed(2);
  }
}

const products = [];
for (const product of dataBaseProducts) {
  products.push(new Product(product, dataBaseDollar));
}

const searchProducts = document.querySelector("#searchProducts");
searchProducts.addEventListener("input", (e) => {
  const searchList = document.querySelector("#searchList");
  searchList.innerHTML = "";
  if (e.target.value.length > 2) {
    const productsFilter = products.filter((product) =>
      product.description.includes(e.target.value.toUpperCase())
    );

    for (const product of productsFilter) {
      let li = document.createElement("li");
      li.innerHTML = `
      <a href="#" class="list-group-item list-group-item-action" id="item-${product.id}" >
        ${product.description}       
      </a>
      `;
      searchList.append(li);

      let linkItem = document.querySelector(`#item-${product.id}`);
      linkItem.addEventListener("click", (e) => {
        const selectedId = Number(e.target.id.slice(5));
        const product = products.find((product) => product.id === selectedId);

        const productCard = document.querySelector("#productCard");
        productCard.classList.remove("d-none");
        productCard.innerHTML = `
        <div
          class="card mb-3 p-4 border border-primary position-relative"
        >
          <button
            class="btn btn-sm btn-outline-danger position-absolute mt-2 me-2 top-0 end-0"
            id="close-${product.id}"
          >
            x
          </button>
          <div class="row g-0">
            <div class="col-12 col-lg-6">
              <img
                src="../assets/images/products/${product.id}-1.jpg"
                alt="..."
                class="imgCart"
              />
            </div>
            <div
              class="col-12 col-lg-6 d-flex flex-column justify-content-around"
            >
              <div class="card-body">
                <h5 class="card-title">${product.description}</h5>
                <p class="card-text">$7600</p>
                <p class="card-text">
                  <small class="text-muted"
                    >stock: ${product.stock}</small
                  >
                </p>
              </div>

              <button
                class="btn btn-primary d-flex justify-content-center align-items-center ms-auto"
                id="add-${product.id}"
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

        const button = document.querySelector(`#add-${product.id}`);
        button.addEventListener("click", () => {
          addCart(product.id, products);
        });

        const close = document.querySelector(`#close-${product.id}`);
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
});

const cartLink = document.querySelector("#cartLink");
cartLink.addEventListener("click", () => showCart());
