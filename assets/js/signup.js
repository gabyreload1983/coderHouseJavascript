import { dataBaseUsers } from "./dataBase.js";

const formSignup = document.querySelector("#formSignup");
const spinnerBorderSignup = document.querySelector("#spinnerBorderSignup");
const messegeResponse = document.querySelector("#messegeResponse");

class User {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.password = user.password;
  }
}

const checkUserExists = (email) => {
  return dataBaseUsers.find((user) => user.email === email);
};

const registerInDataBase = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

formSignup.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = e.target[4].value;
  const confirmPassword = e.target[5].value;
  const email = e.target[3].value;

  messegeResponse.classList.add("d-none");
  spinnerBorderSignup.classList.remove("visually-hidden");

  setTimeout(() => {
    spinnerBorderSignup.classList.add("visually-hidden");

    if (password !== confirmPassword) {
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-danger text-center m-0 py-2">Contraseñas no coinciden</p>
      `;
      return null;
    }

    if (checkUserExists(email)) {
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-danger text-center m-0 py-2">El email ya se encuentra registrado</p>
      `;
      return null;
    }
    const user = new User({
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      celphone: e.target[2].value,
      email: e.target[3].value,
      password: e.target[4].value,
    });
    const response = registerInDataBase(user);
    if (response) {
      sessionStorage.setItem("user", JSON.stringify(response));
      renderNavLogin(response);
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-info text-center m-0 py-2">${user.firstName} ${user.lastName} te registraste con exito!</p>
      `;
      e.target.reset();
    } else {
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-info text-center m-0 py-2">Error inesperado. Intentalo mas tarde.</p>
      `;
    }
  }, 1000);
});
