const formLogin = document.querySelector("#formLogin");
const spinnerBorderLogin = document.querySelector("#spinnerBorderLogin");

const checkUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/assets/database/users.json")
        .then((res) => res.json())
        .then((dataBaseUsers) => {
          let user = dataBaseUsers.find(
            (user) => user.email === email && user.password === password
          );
          user ? resolve({ ...user, password: "" }) : resolve(false);
        })
        .catch((error) => console.log(error));
    }, 2000);
  });
};

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const credentials = { email: e.target[0].value, password: e.target[1].value };

  spinnerBorderLogin.classList.remove("visually-hidden");

  const user = await checkUser(credentials);
  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    renderNavLogin(user);
    e.target.reset();
    spinnerBorderLogin.classList.add("visually-hidden");
    Swal.fire({
      title: `Bienvenido/a ${user.firstName} ${user.lastName}`,
      icon: "success",
      iconColor: "#ec811c",
      confirmButtonColor: "#ec811c",
    }).then((result) => {
      window.location.href = "/";
    });
  } else {
    spinnerBorderLogin.classList.add("visually-hidden");
    Swal.fire({
      title: "Error",
      text: "Datos incorrectos",
      confirmButtonColor: "#e33",
      icon: "error",
    });
  }
});
