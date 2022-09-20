const dataBaseUsers = [
  {
    email: "gaby@gmail.com",
    password: "123",
    firstName: "Gabriel",
    lastName: "Godoy",
    celphone: 147,
  },
  {
    email: "lisa@gmail.com",
    password: "456",
    firstName: "Lisa",
    lastName: "Godoy",
    celphone: 258,
  },
  {
    email: "pilar@gmail.com",
    password: "789",
    firstName: "Pilar",
    lastName: "Mugica",
    celphone: 369,
  },
];

const login = () => {
  const email = prompt("Ingrese su email");
  const password = prompt("Ingrese su password");

  const user = dataBaseUsers.find(
    (user) => user.email === email && password === user.password
  );
  if (user) {
    alert(`Bienvenido ${user.name}`);
  } else {
    alert(`Datos incorrectos`);
    const response = Number(
      prompt(`
    1 - Reintentar
    Cualquier tecla para salir`)
    );
    if (response === 1) login();
  }
};

login();
