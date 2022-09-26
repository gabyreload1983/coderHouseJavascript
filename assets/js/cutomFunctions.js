const cart = [];

export const sort = (array, key = "price", direction = "ASC") => {
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

export const createListProducts = (products, selectedCategory = false) => {
  let listProducts = document.querySelector("#listProducts");
  listProducts.innerHTML = "";
  for (let product of products) {
    if (product.categorie === selectedCategory || selectedCategory === false) {
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

      let button = document.querySelector(`#add-${product.id}`);
      button.addEventListener("click", () => {
        addCart(product.id, products);
      });

      let image = document.querySelector(`#image-${product.id}`);
      image.addEventListener("click", (e) => {
        console.log("Falta hacer zomm", product.id);
      });
    }
  }
};

export const creatListCategories = (categories, products) => {
  let listCategories = document.querySelector("#listCategories");
  for (let categorie of categories) {
    let li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link navCategories p-2 mb-2" href="#" id="categorie-${categorie.id}">${categorie.description}</a>`;
    listCategories.append(li);

    let categorieHandler = document.querySelector(`#categorie-${categorie.id}`);
    categorieHandler.addEventListener("click", () => {
      const orderBy = document.querySelector("#orderProductsByPrice").value;
      sort(products, "price", orderBy);
      selectedCategorie(categorie.id);
      createListProducts(products, categorie.id);
    });
  }
};

const selectedCategorie = (categorieId) => {
  const selected = document.querySelector(`#categorie-${categorieId}`);
  selected.classList.add("navCategoriesActive");

  const navCategories = document.querySelectorAll(".navCategories");
  for (const nav of navCategories) {
    if (nav.id !== `categorie-${categorieId}`) {
      nav.classList.remove("navCategoriesActive");
    }
  }
};

export const addCart = (productId, products) => {
  const exists = cart.find((product) => product.id === productId);
  if (exists) {
    const index = cart.indexOf(exists);
    cart[index].quantity++;
  } else {
    const product = products.find((product) => product.id === productId);
    product.quantity = 1;
    cart.push(product);
  }

  const cartItem = document.querySelector("#cartItem");
  cartItem.innerHTML = cart.length;
};

export const removeCart = (productId) => {
  const item = cart.find((product) => product.id === productId);
  const index = cart.indexOf(item);
  cart.splice(index, 1);
  showCart(cart);

  const cartItem = document.querySelector("#cartItem");
  cartItem.innerHTML = cart.length;
};

export const showCart = () => {
  const cartModalBody = document.querySelector("#cartTbody");
  cartModalBody.innerHTML = "";
  cart.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <th>${product.quantity}</th>
        <td>${product.description}</td>
        <td>$${product.addTax()}</td>
        <td> <button type="button" class="btn btn-outline-danger" id="removeCart${
          product.id
        }">X</button></td>
      `;
    cartModalBody.append(tr);

    const button = document.querySelector(`#removeCart${product.id}`);
    button.addEventListener("click", () => removeCart(product.id, cart));
  });

  const total = cart
    .reduce((acc, prod) => acc + prod.addTax() * prod.quantity, 0)
    .toFixed(2);

  const cartTotal = document.querySelector("#cartTotal");
  cartTotal.innerHTML = `$${total}`;
};
