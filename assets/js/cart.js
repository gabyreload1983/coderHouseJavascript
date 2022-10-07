const cartLink = document.querySelector("#cartLink");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const modalDate = document.querySelector("#modalDate");
const cartModalBody = document.querySelector("#cartTbody");
const confirmCart = document.querySelector("#confirmCart");
const emptyCart = document.querySelector("#emptyCart");
const confirmPayment = document.querySelector("#confirmPayment");
const modalBodyPayment = document.querySelector("#modalBodyPayment");
const spinnerBorderConfirmPayment = document.querySelector(
  "#spinnerBorderConfirmPayment"
);
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.innerHTML = cart.length;
const DateTime = luxon.DateTime;

const showCart = () => {
  const now = DateTime.now();
  modalDate.innerHTML = `
  <h6 class="pt-2">Fecha: ${now.day}-${now.month}-${now.year}</h6>
  `;

  cartModalBody.innerHTML = "";
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length) {
    confirmCart.removeAttribute("disabled");
    emptyCart.removeAttribute("disabled");
  } else {
    confirmCart.setAttribute("disabled", true);
    emptyCart.setAttribute("disabled", true);
  }

  cart.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>  <img
        src="${url}/assets/images/products/${product.id}-1.jpg"
        class="imgCart"
        alt="..."
        id="imageCart-${product.id}"
      /></td>
        <td>${product.quantity}</td>
        <td class="d-none d-lg-table-cell">${product.description}</td>
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
  !cart.length && confirmCart.setAttribute("disabled", true);
};

const addCart = (product) => {
  const exists = cart.find((item) => item.id === product.id);
  if (exists) {
    exists.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerHTML = cart.length;
};

const deleteCart = () => {
  Swal.fire({
    title: "Esta seguro",
    text: "Quiere vaciar el carrito???",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Vaciar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cart");
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCount.innerHTML = cart.length;
      showCart();
      Swal.fire("Carrito vaciado!");
    }
  });
};

const processPayment = () => {
  spinnerBorderConfirmPayment.classList.remove("visually-hidden");

  setTimeout(() => {
    localStorage.removeItem("cart");
    cart = [];
    cartCount.innerHTML = cart.length;
    spinnerBorderConfirmPayment.classList.add("visually-hidden");
    Swal.fire({
      title: "Pago exitoso",
      text: `Tu pago se realizo con exito.
      Gracias por tu compra!`,
      icon: "success",
    }).then((result) => (window.location.href = `${url}/index.html`));
  }, 1500);
};

cartLink.addEventListener("click", () => showCart());
confirmPayment.addEventListener("click", () => processPayment());
emptyCart.addEventListener("click", () => deleteCart());
