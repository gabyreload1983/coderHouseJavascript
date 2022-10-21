const cartLink = document.querySelector("#cartLink");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const modalDate = document.querySelector("#modalDate");
const cartModalBody = document.querySelector("#cartTbody");
const confirmCart = document.querySelector("#confirmCart");
const emptyCart = document.querySelector("#emptyCart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.innerHTML = cart.length;

const showCart = () => {
  const now = new Date();

  modalDate.innerHTML = `
  <h6 class="pt-2">Fecha: ${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()}</h6>
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

const checkLogin = async () => {
  if (!userSession) {
    Swal.fire({
      title: "Importante!",
      text: `Tienes que iniciar sesion para realizar la compra`,
      icon: "info",
      confirmButtonColor: "#ec811c",
      iconColor: "#ec811c",
    }).then((result) => (window.location.href = `${url}/pages/login.html`));
  } else {
    const response = await Swal.fire({
      title: "Pagar con Mercadopago",
      text: "Accediendo a tu cuenta...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec811c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pagar!",
      cancelButtonText: "Cancelar",
    });
    if (response.isConfirmed) {
      Swal.fire({
        title: "Procesando pago...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const serviceID = "default_service";
        const templateID = "template_n0u9roi";

        const result = await emailjs.send(serviceID, templateID, userSession);
        if (result) {
          Swal.fire({
            title: "Tu pago se realizo con exito!!!",
            text: `Gracias por tu compra ${userSession.firstName} ${userSession.lastName}!
              Te enviamos un email para coordinar el envio.`,
            confirmButtonColor: "#ec811c",
            icon: "success",
            iconColor: "#ec811c",
          });
          localStorage.removeItem("cart");
          cart = [];
          cartCount.innerHTML = cart.length;
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `${userSession.firstName} ${userSession.lastName}, hubo un problema.
             Intenta mas tarde.`,
          icon: "error",
          confirmButtonColor: "#e33",
        });
      }
    }
  }
};

cartLink.addEventListener("click", () => showCart());
emptyCart.addEventListener("click", () => deleteCart());
confirmCart.addEventListener("click", () => checkLogin());
