import { dataBaseUsers } from "./dataBase.js";

const formLogin = document.querySelector("#formLogin");
const spinnerBorderLogin = document.querySelector("#spinnerBorderLogin");
const messegeResponse = document.querySelector("#messegeResponse");

const checkUser = ({ email, password }) => {
  let user = dataBaseUsers.find(
    (user) => user.email === email && user.password === password
  );

  return user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    : false;
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const credentials = { email: e.target[0].value, password: e.target[1].value };

  spinnerBorderLogin.classList.remove("visually-hidden");
  messegeResponse.classList.add("d-none");

  setTimeout(() => {
    const user = checkUser(credentials);
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      renderNavLogin(user);
      e.target.reset();
      spinnerBorderLogin.classList.add("visually-hidden");
      window.location.href = "../index.html";
    } else {
      spinnerBorderLogin.classList.add("visually-hidden");
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-danger text-center m-0 py-2">Datos incorrectos</p>
      `;
    }
  }, 1000);
});
