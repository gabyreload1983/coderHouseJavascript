import { dataBaseUsers } from "./dataBase.js";

const formSignup = document.querySelector("#formSignup");
const spinnerBorderSignup = document.querySelector("#spinnerBorderSignup");

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

const registerInDataBase = ({
  firstName,
  lastName,
  email,
  celphone,
  password,
}) => {
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
};

formSignup.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = e.target[4].value;
  const confirmPassword = e.target[5].value;
  const email = e.target[3].value;

  spinnerBorderSignup.classList.remove("visually-hidden");

  setTimeout(() => {
    spinnerBorderSignup.classList.add("visually-hidden");

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Contraseñas no coinciden",
        icon: "warning",
      });
      return null;
    }

    if (checkUserExists(email)) {
      Swal.fire({
        title: "Error",
        text: "El email ya se encuentra registrado",
        icon: "warning",
      });
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
      e.target.reset();
      Swal.fire({
        title: "Registro con exito!",
        text: `${user.firstName} ${user.lastName} gracias por registrarte `,
        icon: "success",
      }).then((result) => {
        window.location.href = "../index.html";
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Error inesperado. Intentalo mas tarde.",
        icon: "error",
      });
    }
  }, 1000);
});
