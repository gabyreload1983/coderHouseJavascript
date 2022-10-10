const cartLink = document.querySelector("#cartLink");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const modalDate = document.querySelector("#modalDate");
const cartModalBody = document.querySelector("#cartTbody");
const confirmCart = document.querySelector("#confirmCart");
const emptyCart = document.querySelector("#emptyCart");
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
    title: "Estas seguro",
    text: "Que quieres vaciar el carrito???",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ec811c",
    cancelButtonColor: "#d33",
    confirmButtonText: "Vaciar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cart");
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCount.innerHTML = cart.length;
      showCart();
      Swal.fire({
        title: "Carrito vacio",
        confirmButtonColor: "#ec811c",
        icon: "success",
        iconColor: "#ec811c",
      });
    }
  });
};

const checkLogin = () => {
  if (!userSession) {
    Swal.fire({
      title: "Importante!",
      text: `Tienes que iniciar sesion para realizar la compra`,
      icon: "info",
      confirmButtonColor: "#ec811c",
      iconColor: "#ec811c",
    }).then((result) => (window.location.href = `${url}/pages/login.html`));
  } else {
    Swal.fire({
      title: "Pagar con Mercadopago",
      text: "Accediendo a tu cuenta...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec811c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pagar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "Mercadopago",
          html: "Estamos procesando tu pago",
          timer: 4000,
          timerProgressBar: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          localStorage.removeItem("cart");
          cart = [];
          cartCount.innerHTML = cart.length;
          Swal.fire({
            title: "Tu pago se realizo con exito!!!",
            text: `Gracias por tu compra ${userSession.firstName} ${userSession.lastName}!`,
            confirmButtonColor: "#ec811c",
            icon: "success",
            iconColor: "#ec811c",
          });
        });
      }
    });
  }
};

cartLink.addEventListener("click", () => showCart());
emptyCart.addEventListener("click", () => deleteCart());
confirmCart.addEventListener("click", () => checkLogin());
