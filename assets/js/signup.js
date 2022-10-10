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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/assets/database/users.json")
        .then((res) => res.json())
        .then((dataBaseUsers) => {
          let user = dataBaseUsers.find((user) => user.email === email);
          user ? resolve({ ...user, password: "" }) : resolve(false);
        })
        .catch((error) => console.log(error));
    }, 2000);
  });
};

const registerInDataBase = ({
  firstName,
  lastName,
  email,
  celphone,
  password,
}) => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
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
    })
      .then((response) => response.json())
      .then((user) => {
        resolve({ ...user, password: "" });
      })
      .catch((error) => console.log(error));
  });
};

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = new User({
    firstName: e.target[0].value,
    lastName: e.target[1].value,
    celphone: e.target[2].value,
    email: e.target[3].value,
    password: e.target[4].value,
  });
  const confirmPassword = e.target[5].value;

  spinnerBorderSignup.classList.remove("visually-hidden");

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

  const validEmail = await checkUserExists(user.email);
  if (validEmail) {
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
      text: `${user.firstName} ${user.lastName} gracias por registrarte `,
      confirmButtonColor: "#ec811c",
      icon: "success",
      iconColor: "#ec811c",
    }).then((result) => {
      window.location.href = "../index.html";
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
