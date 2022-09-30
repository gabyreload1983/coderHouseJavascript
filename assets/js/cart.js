const cartLink = document.querySelector("#cartLink");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const cartModalBody = document.querySelector("#cartTbody");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.innerHTML = cart.length;

const showCart = () => {
  cartModalBody.innerHTML = "";
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <th>${product.quantity}</th>
        <td>${product.description}</td>
        <td>$${product.priceWithTax.toFixed(2)}</td>
        <td> <button type="button" class="btn btn-outline-danger" id="removeProduct${
          product.id
        }">X</button></td>
      `;
    cartModalBody.append(tr);

    const removeProduct = document.querySelector(`#removeProduct${product.id}`);
    removeProduct.addEventListener("click", () => removeCart(product.id));
  });

  const total = cart
    .reduce((acc, prod) => acc + prod.price * 1.105 * prod.quantity, 0)
    .toFixed(2);

  cartTotal.innerHTML = `$${total}`;
};

const removeCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);

  cartCount.innerHTML = cart.length;
};

const addCart = (product) => {
  const exists = cart.find((item) => item.id === product.id);
  if (exists) {
    exists.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerHTML = cart.length;
};

cartLink.addEventListener("click", () => showCart());
