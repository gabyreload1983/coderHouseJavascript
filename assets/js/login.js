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
  const user = checkUser(credentials);
  if (user) {
    const userName = document.querySelector("#userName");
    userName.innerText = user.firstName;
    e.target.reset();
  } else {
    console.log("datos incorrectos");
  }
});
