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

const checkUserExists = async (email) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/gabyreload1983/apiJavascript/main/db.json"
    );
    const { users } = await response.json();
    let user = users.find((user) => user.email === email);
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
};

const registerInDataBase = async ({
  firstName,
  lastName,
  email,
  celphone,
  password,
}) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        celphone: celphone,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const user = await response.json();
    return { ...user, password: "" };
  } catch (error) {
    console.log(error);
  }
};

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinnerBorderSignup.classList.remove("visually-hidden");

  const user = new User({
    firstName: e.target[0].value,
    lastName: e.target[1].value,
    celphone: e.target[2].value,
    email: e.target[3].value,
    password: e.target[4].value,
  });
  const confirmPassword = e.target[5].value;

  if (user.password !== confirmPassword) {
    spinnerBorderSignup.classList.add("visually-hidden");
    Swal.fire({
      title: "Error",
      text: "Contraseñas no coinciden",
      confirmButtonColor: "#ec811c",
      icon: "warning",
    });
    return;
  }

  const exists = await checkUserExists(user.email);
  if (exists) {
    spinnerBorderSignup.classList.add("visually-hidden");
    Swal.fire({
      title: "Error",
      text: "El email ya se encuentra registrado",
      confirmButtonColor: "#ec811c",
      icon: "warning",
    });
    return;
  }

  const response = await registerInDataBase(user);
  if (response) {
    sessionStorage.setItem("user", JSON.stringify(response));
    renderNavLogin(response);
    e.target.reset();
    Swal.fire({
      title: "Registro con exito!",
      text: `${response.firstName} ${response.lastName} gracias por registrarte `,
      confirmButtonColor: "#ec811c",
      icon: "success",
      iconColor: "#ec811c",
    }).then((result) => {
      window.location.href = "../";
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "Error inesperado. Intentalo mas tarde.",
      confirmButtonColor: "#e33",
      icon: "error",
    });
  }
  spinnerBorderSignup.classList.add("visually-hidden");
});
