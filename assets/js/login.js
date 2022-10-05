import { dataBaseUsers } from "./dataBase.js";

const formLogin = document.querySelector("#formLogin");
const spinnerBorderLogin = document.querySelector("#spinnerBorderLogin");

const checkUser = ({ email, password }) => {
  let user = dataBaseUsers.find(
    (user) => user.email === email && user.password === password
  );

  return user ? { ...user, password: "" } : false;
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const credentials = { email: e.target[0].value, password: e.target[1].value };

  spinnerBorderLogin.classList.remove("visually-hidden");

  setTimeout(() => {
    const user = checkUser(credentials);
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      renderNavLogin(user);
      e.target.reset();
      spinnerBorderLogin.classList.add("visually-hidden");
      swal({
        title: `Bienvenido/a ${user.firstName} ${user.lastName}`,
        icon: "success",
      }).then((result) => {
        window.location.href = "../index.html";
      });
    } else {
      spinnerBorderLogin.classList.add("visually-hidden");
      swal({
        title: "Error",
        text: "Datos incorrectos",
        icon: "error",
      });
    }
  }, 1000);
});
