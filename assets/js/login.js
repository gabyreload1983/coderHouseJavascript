import { dataBaseUsers } from "./dataBase.js";

const formLogin = document.querySelector("#formLogin");
const spinnerBorderLogin = document.querySelector("#spinnerBorderLogin");
const messegeResponse = document.querySelector("#messegeResponse");

const checkUser = (credentials) => {
  let user = dataBaseUsers.find(
    (user) =>
      user.email === credentials.email && user.password === credentials.password
  );
  if (user) {
    user = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  return user;
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
    } else {
      spinnerBorderLogin.classList.add("visually-hidden");
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-danger text-center m-0 py-2">Datos incorrectos</p>
      `;
    }
  }, 1000);
});
