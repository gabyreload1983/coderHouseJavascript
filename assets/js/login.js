const formLogin = document.querySelector("#formLogin");
const spinnerBorderLogin = document.querySelector("#spinnerBorderLogin");

const login = async ({ email, password }) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/gabyreload1983/apiJavascript/main/db.json"
    );
    const { users } = await response.json();
    let user = users.find(
      (user) => user.email === email && user.password === password
    );
    return user ? { ...user, password: "" } : false;
  } catch (error) {
    console.log(error);
  }
};

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const credentials = { email: e.target[0].value, password: e.target[1].value };

  spinnerBorderLogin.classList.remove("visually-hidden");

  const user = await login(credentials);

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
      window.location.href = "../";
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
