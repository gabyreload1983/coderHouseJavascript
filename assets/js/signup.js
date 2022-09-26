import { dataBaseUsers } from "./dataBase.js";

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

const register = (user) => {
  return true;
};

const formSignup = document.querySelector("#formSignup");
formSignup.addEventListener("submit", (e) => {
  e.preventDefault();

  const messegeResponse = document.querySelector("#messegeResponse");
  messegeResponse.classList.add("d-none");

  const spinnerBorder = document.querySelector(".spinner-border");
  spinnerBorder.classList.remove("visually-hidden");

  setTimeout(() => {
    spinnerBorder.classList.add("visually-hidden");

    const password = e.target[4].value;
    const confirmPassword = e.target[5].value;

    if (password !== confirmPassword) {
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-danger text-center m-0 py-2">Contraseñas no coinciden</p>
      `;
      return null;
    }
    const email = e.target[3].value;
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
    const response = register(user);
    if (response) {
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-info text-center m-0 py-2">${user.firstName} ${user.lastName} te registraste con exito!</p>
      `;
      const userName = document.querySelector("#userName");
      userName.innerText = user.firstName;
      e.target.reset();
    }
  }, 1000);
});
