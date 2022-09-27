import {
  dataBaseCategories,
  dataBaseDollar,
  dataBaseProducts,
} from "./dataBase.js";

const cartLink = document.querySelector("#cartLink");
const cartCount = document.querySelector("#cartCount");
const cartModalBody = document.querySelector("#cartTbody");
const cartTotal = document.querySelector("#cartTotal");
const listProducts = document.querySelector("#listProducts");
const listCategories = document.querySelector("#listCategories");
const filterByPrice = document.querySelector("#filterByPrice");

let cart = [];
const products = [];

const sort = (array, key = "price", direction = "ASC") => {
  array.sort((a, b) => {
    if (a[key] > b[key]) {
      return direction === "ASC" ? 1 : -1;
    }
    if (a[key] < b[key]) {
      return direction === "ASC" ? -1 : 1;
    }
    return 0;
  });
  return array;
};

const createListProducts = (products, selectedCategory = false) => {
  listProducts.innerHTML = "";
  for (let product of products) {
    if (product.category === selectedCategory || selectedCategory === false) {
      let div = document.createElement("div");
      div.className = "col-12 col-md-6 col-lg-3 mb-3";
      div.innerHTML = `
    <div class="card border border-primary">
      <img
        src="../assets/images/products/${product.id}-1.jpg"
        class="cardIamge"
        alt="..."
        id="image-${product.id}"
      />
      <div class="card-body d-flex flex-column justify-content-end">
        <strong>CODIGO: ${product.id}</strong>
        <h5 class="card-title">
          ${product.description}
        </h5>
        <p class="card-text">$${product.addTax()}</p>
        <button
          class="btn btn-primary d-flex justify-content-center align-items-center"
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
    
    `;
      listProducts.append(div);

      let addProduct = document.querySelector(`#add-${product.id}`);
      addProduct.addEventListener("click", () => {
        addCart(product);
      });

      let image = document.querySelector(`#image-${product.id}`);
      image.addEventListener("click", (e) => {
        console.log("Falta hacer zomm", product.id);
      });
    }
  }
};

const creatListCategories = (categories) => {
  for (let category of categories) {
    let li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link navCategories p-2 mb-2" href="#" id="category-${category.id}">${category.description}</a>`;
    listCategories.append(li);

    let categoryHandler = document.querySelector(`#category-${category.id}`);
    categoryHandler.addEventListener("click", () => {
      selectedCategory(category.id);
      sort(products, "price", filterByPrice.value);
      createListProducts(products, category.id);
    });
  }
};

const selectedCategory = (categoryId) => {
  const selected = document.querySelector(`#category-${categoryId}`);
  selected.classList.add("navCategoriesActive");

  const navCategories = document.querySelectorAll(".navCategories");
  for (const nav of navCategories) {
    if (nav.id !== `category-${categoryId}`) {
      nav.classList.remove("navCategoriesActive");
    }
  }
};

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

const orderProductsBy = (orientation) => {
  const selectedCategory = document.querySelector(".navCategoriesActive");
  sort(products, "price", orientation);
  if (selectedCategory !== null) {
    const selectedCategoryId = Number(selectedCategory.id.slice(9));
    createListProducts(products, selectedCategoryId);
  } else {
    createListProducts(products);
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

sort(products);
sort(dataBaseCategories, "description");

creatListCategories(dataBaseCategories);
createListProducts(products);

filterByPrice.addEventListener("change", (e) => {
  const orientation = e.target.value;
  orderProductsBy(orientation);
});

cartLink.addEventListener("click", () => showCart());
