import { dataBaseUsers } from "./dataBase.js";

const checkUser = (credentials) => {
  const user = dataBaseUsers.find(
    (user) =>
      user.email === credentials.email && user.password === credentials.password
  );

  return user;
};

const formLogin = document.querySelector("#formLogin");
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const credentials = { email: e.target[0].value, password: e.target[1].value };

  const spinnerBorder = document.querySelector(".spinner-border");
  spinnerBorder.classList.remove("visually-hidden");

  const messegeResponse = document.querySelector("#messegeResponse");
  messegeResponse.classList.add("d-none");

  setTimeout(() => {
    const user = checkUser(credentials);
    if (user) {
      const userName = document.querySelector("#userName");
      userName.innerText = user.firstName;
      e.target.reset();
      spinnerBorder.classList.add("visually-hidden");
    } else {
      spinnerBorder.classList.add("visually-hidden");
      messegeResponse.classList.remove("d-none");
      messegeResponse.innerHTML = `
      <p class="text-danger text-center m-0 py-2">Datos incorrectos</p>
      `;
    }
  }, 1000);
});
